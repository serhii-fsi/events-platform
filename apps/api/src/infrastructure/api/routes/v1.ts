import express from 'express';
const router = express.Router();

import { eventsController } from '../controllers/events';
router.get('/api/events', eventsController.getMany);

export default router;
