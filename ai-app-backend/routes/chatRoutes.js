import express from 'express';
import OpenAI from 'openai';
import { protect } from '../middleware/authMiddleware.js';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Zaštićena ruta za slanje AI upita
router.post('/chat', protect, async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: '❌ Neispravan zahtev. Očekuje se "messages" niz.' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo', // ✅ koristi najbolji model za generaciju sadržaja
      messages,
      temperature: 0.7,
      max_tokens: 1500,
    });

    const aiResponse = completion.choices[0].message.content;
    res.json({ response: aiResponse });
  } catch (error) {
    console.error('❌ OpenAI greška:', error.message);
    res.status(500).json({ error: 'Greška pri komunikaciji sa AI-jem.', details: error.message });
  }
});

export default router;
