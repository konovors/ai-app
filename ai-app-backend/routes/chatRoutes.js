import express from 'express';
import OpenAI from 'openai';
import { protect } from '../middleware/authMiddleware.js'; // ✅ ispravno uvezen middleware
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Zaštićena ruta za slanje AI upita
router.post('/chat', protect, async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt je obavezan.' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    const aiResponse = completion.choices[0].message.content;
    res.json({ response: aiResponse });
  } catch (error) {
    console.error('OpenAI greška:', error.message);
    res.status(500).json({ error: 'Greška pri komunikaciji sa AI-jem.' });
  }
});

export default router;
