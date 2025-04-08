import express from 'express';

const router = express.Router();

router.get('/test', (req, res) => {
  res.json({ success: true, message: 'API radi!' });
});

export default router;
