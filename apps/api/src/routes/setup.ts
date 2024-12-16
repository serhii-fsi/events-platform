import express from 'express';
const router = express.Router();
import { DEV_MODE, TEST_MODE } from '../common/utils/appMode';
import { checkSeedData } from '../db/seeds/checkSeedData';
import { seed } from '../db/seeds/seed';
import { purge } from '../db/seeds/purge';

// Seed db
if (DEV_MODE || TEST_MODE) {
  router.get('/seed-db', async (req, res) => {
    try {
      res.json({
        message: (await checkSeedData()) ? true : await seed(),
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
}

// Purge db
if (DEV_MODE || TEST_MODE) {
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
