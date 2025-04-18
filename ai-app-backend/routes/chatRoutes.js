import express from 'express';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import { presetProfiles } from '../utils/presetProfiles.js'; // prilagodi putanju ako je drugačija

dotenv.config();
const router = express.Router();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * ✅ GET /chat-stream
 * Streamuje odgovor karakter po karakter (EventSource)
 */
router.get('/chat-stream', async (req, res) => {
  const messages = JSON.parse(req.query.messages);
  const presetKey = req.query.preset || 'marketing';
  const profile = presetProfiles[presetKey] || presetProfiles.marketing;

  if (!messages) {
    return res.status(400).json({ error: 'Nedostaju poruke' });
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  try {
    const stream = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages,
      stream: true,
      ...profile,
    });

    let sentSomething = false;

    for await (const chunk of stream) {
      const content = chunk.choices?.[0]?.delta?.content;
      if (content) {
        res.write(`data: ${content}\n\n`);
        sentSomething = true;
      }
    }

    if (!sentSomething) {
      res.write(`data: [NO_CONTENT]\n\n`);
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error) {
    console.error('❌ Stream greška:', error);
    res.write('data: [ERROR]\n\n');
    res.end();
  }
});

/**
 * ✅ POST /chat
 * Koristi se za ne-streamovano generisanje (za duži sadržaj sa brojanjem reči)
 */
router.post('/chat', async (req, res) => {
  const { messages, preset = 'marketing' } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Poruke su obavezne.' });
  }

  try {
    const profile = presetProfiles[preset] || presetProfiles.marketing;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages,
      stream: false,
      ...profile,
    });

    const content = completion.choices?.[0]?.message?.content || '';
    res.json({ response: content });
  } catch (error) {
    console.error('❌ Chat greška:', error);
    res.status(500).json({ error: 'Greška pri generisanju odgovora.' });
  }
});

export default router;
