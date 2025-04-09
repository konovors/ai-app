import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import testRoutes from './routes/testRoutes.js';
import authRoutes from './routes/authRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import userRoutes from './routes/userRoutes.js';
import companyProfileRoutes from './routes/companyProfile.js'; // ✅ nova ruta za profile

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
app.use('/api', chatRoutes);
app.use('/api/users', userRoutes); // ✅ korisnici
app.use('/api/profile', companyProfileRoutes); // ✅ profil kompanije

// Pokretanje servera
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server radi na portu ${PORT}`));
