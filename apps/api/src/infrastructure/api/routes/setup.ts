import express from 'express';
const router = express.Router();
import { checkSeedData } from '../../db/seeds/checkSeedData';
import { seed } from '../../db/seeds/seed';
import { purge } from '../../db/seeds/purge';

// Seed/Purge Database Routes
if (process.env.SEED_PURGE_ALLOWED_MODES.includes(process.env.APP_MODE)) {
  router.get('/seed-db', async (req, res) => {
    try {
      res.json({
        message: (await checkSeedData()) ? true : await seed(),
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get('/purge-db', async (req, res) => {
    try {
      res.json({
        message: await purge(),
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
}

export default router;
