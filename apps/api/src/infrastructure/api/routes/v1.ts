import express from 'express';
const router = express.Router();

import { eventsController } from '../controllers/events';
router.get('/api/events', eventsController.getMany);
router.post('/api/events', eventsController.create);

export default router;
