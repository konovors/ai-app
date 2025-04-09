import express from 'express';
import CompanyProfile from '../models/companyProfile.model.js';

const router = express.Router();

// Snimi (ili ažuriraj) profil kompanije
router.post('/save', async (req, res) => {
  try {
    const { userId, companyName, ...rest } = req.body;

    // ✅ Validacija obaveznih polja
    if (!userId || !companyName) {
      console.warn('⚠️ Nedostaje userId ili companyName:', { userId, companyName });
      return res.status(400).json({ error: 'Nedostaje userId ili naziv kompanije.' });
    }

    const profileData = { companyName, ...rest };

    const existing = await CompanyProfile.findOne({ userId });

    const profile = existing
      ? await CompanyProfile.findOneAndUpdate({ userId }, profileData, { new: true })
      : await CompanyProfile.create({ userId, ...profileData });

    console.log('✅ Profil kompanije sačuvan:', profile._id);
    res.json(profile);
  } catch (error) {
    console.error('❌ Greška pri snimanju profila:', error.message);
    res.status(500).json({ error: 'Greška pri snimanju profila kompanije.', details: error.message });
  }
});

// Dohvati profil kompanije
router.get('/:userId', async (req, res) => {
  try {
    const profile = await CompanyProfile.findOne({ userId: req.params.userId });

    if (!profile) {
      return res.status(404).json({ error: 'Profil nije pronađen.' });
    }

    res.json(profile);
  } catch (error) {
    console.error('❌ Greška pri dohvatanju profila:', error.message);
    res.status(500).json({ error: 'Greška pri dohvatanju profila.', details: error.message });
  }
});

export default router;
