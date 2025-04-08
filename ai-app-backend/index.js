import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import testRoutes from './routes/testRoutes.js';
import authRoutes from './routes/authRoutes.js';
import chatRoutes from './routes/chatRoutes.js'; // ✅ dodatak za AI

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB konekcija
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB konektovan'))
  .catch((err) => console.error('❌ Greška pri konekciji na MongoDB:', err));

// Rute
app.use('/api', testRoutes);
app.use('/api', authRoutes);
app.use('/api', chatRoutes); // ✅ ruta za /api/chat

// Pokretanje servera
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server radi na portu ${PORT}`));



