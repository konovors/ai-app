// ✅ chatStreamRoute.js – Streamovana AI komunikacija (Express backend)
import express from 'express';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import { presetProfiles } from '../utils/presetProfiles.js'; // ✅ putanja prilagodi po potrebi

dotenv.config();
const router = express.Router();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.get('/chat-stream', async (req, res) => {
  const messages = JSON.parse(req.query.messages);
  const presetKey = req.query.preset || 'marketing'; // preset iz query-ja (npr. storytelling)
  const profile = presetProfiles[presetKey] || presetProfiles.marketing; // fallback

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
      ...profile // ✅ ubacujemo preset profile (temperature, top_p, max_tokens)
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

export default router;
