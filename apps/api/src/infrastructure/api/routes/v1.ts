import express from 'express';
import { auth } from '../middleware/auth';
import { Role } from '../../../domain/constants';
import { authController } from '../controllers/auth';
import { eventsController } from '../controllers/events';

const router = express.Router();

router.get(
  '/api/auth/status',
  auth((req, authenticatedUser, storedUser) => {
    if (
      authenticatedUser &&
      (storedUser?.role === Role.USER ||
        storedUser?.role === Role.EDITOR ||
        storedUser?.role === Role.ADMIN)
    )
      return true;
    else return false;
  }),
  authController.getStatus
);

// Events
// Public endpoint, no need auth middleware
router.get('/api/events', eventsController.getMany);

router.post(
  '/api/events',
  auth((req, authenticatedUser, storedUser) => {
    if (
      authenticatedUser &&
      (storedUser?.role === Role.EDITOR || storedUser?.role === Role.ADMIN)
    )
      return true;
    else return false;
  }),
  eventsController.create
);

router.get('/api/events/:eventId', eventsController.getById);

export default router;
