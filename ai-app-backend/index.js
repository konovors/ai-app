// ✅ index.js – Glavni Express server sa SSE i CORS podešavanjem
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import testRoutes from './routes/testRoutes.js';
import authRoutes from './routes/authRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import userRoutes from './routes/userRoutes.js';
import companyProfileRoutes from './routes/companyProfile.js';
import chatStreamRoute from './routes/chatStreamRoute.js'; // ✅ SSE stream ruta

dotenv.config();

const app = express();

// ✅ CORS podešavanje – dozvoli localhost frontend (SSE kompatibilno)
app.use(cors({
  origin: 'http://localhost:5173', // zameni domen ako koristiš produkciju
  methods: ['GET', 'POST'],
  credentials: true,
}));

app.use(express.json());

// ✅ MongoDB konekcija
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB konektovan'))
  .catch((err) => console.error('❌ Greška pri konekciji na MongoDB:', err));

// ✅ API rute
app.use('/api', testRoutes);
app.use('/api', authRoutes);
app.use('/api', chatRoutes);
app.use('/api', chatStreamRoute); // ✅ aktiviraj stream rutu
app.use('/api/users', userRoutes);
app.use('/api/profile', companyProfileRoutes);

// ✅ Pokretanje servera
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server radi na portu ${PORT}`));
