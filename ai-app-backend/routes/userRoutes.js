import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
const router = express.Router();


// Sacuvaj usera
router.put('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'Korisnik nije pronađen' })
    }

    // Ažuriranje polja
    if (req.body.name) user.name = req.body.name
    if (req.body.email) user.email = req.body.email

    // Ako se lozinka menja, bcryptuj je
    if (req.body.password && req.body.password.trim() !== '') {
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(req.body.password, salt)
    }

    const updatedUser = await user.save()

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      message: 'Korisnik je uspešno ažuriran'
    })

  } catch (error) {
    console.error('Greška:', error)
    res.status(500).json({ message: 'Greška na serveru' })
  }
});

export default router;