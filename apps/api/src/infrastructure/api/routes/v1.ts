import express from 'express';
import { auth } from '../middleware/auth';
import { Role } from '../../../domain/constants';
import { authController } from '../controllers/auth';
import { eventsController } from '../controllers/events';
import { attendanceController } from '../controllers/attendance';
import { calendarController } from '../controllers/calendar';
import { usersController } from '../controllers/users';

const router = express.Router();

const authEditorsAndAdmins = auth((req, authenticatedUser, storedUser) => {
  if (
    authenticatedUser &&
    (storedUser?.role === Role.EDITOR || storedUser?.role === Role.ADMIN)
  )
    return true;
  else return false;
});

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

router.post('/api/events', authEditorsAndAdmins, eventsController.create);

router.get('/api/events/:eventId', eventsController.getById);

router.patch(
  '/api/events/:eventId',
  authEditorsAndAdmins,
  eventsController.update
);

router.delete(
  '/api/events/:eventId',
  authEditorsAndAdmins,
  eventsController.delete
);

router.get(
  '/api/users/:userId/events/:eventId/attendance-status',
  auth((req, authenticatedUser, storedUser) => {
    if (!authenticatedUser) return false;
    if (storedUser?.role === Role.USER || storedUser?.role === Role.EDITOR) {
      return storedUser.id === Number(req.params.userId);
    } else if (storedUser?.role === Role.ADMIN) {
      return true;
    } else {
      return false;
    }
  }),
  attendanceController.getStatus
);

router.patch(
  '/api/users/:userId/events/:eventId/attendance-status',
  auth((req, authenticatedUser, storedUser) => {
    if (!authenticatedUser) return false;
    if (
      storedUser?.role === Role.USER ||
      storedUser?.role === Role.EDITOR ||
      storedUser?.role === Role.ADMIN
    ) {
      return storedUser.id === Number(req.params.userId);
    } else {
      return false;
    }
  }),
  attendanceController.setStatus
);

router.get(
  '/api/users/:userId/events/:eventId/calendar-status',
  auth((req, authenticatedUser, storedUser) => {
    if (!authenticatedUser) return false;
    if (storedUser?.role === Role.USER || storedUser?.role === Role.EDITOR) {
      return storedUser.id === Number(req.params.userId);
    } else if (storedUser?.role === Role.ADMIN) {
      return true;
    } else {
      return false;
    }
  }),
  calendarController.getStatus
);

router.patch(
  '/api/users/:userId/events/:eventId/calendar-status',
  auth((req, authenticatedUser, storedUser) => {
    if (!authenticatedUser) return false;
    if (
      storedUser?.role === Role.USER ||
      storedUser?.role === Role.EDITOR ||
      storedUser?.role === Role.ADMIN
    ) {
      return storedUser.id === Number(req.params.userId);
    } else {
      return false;
    }
  }),
  calendarController.setStatus
);

router.get(
  '/api/users',
  auth((req, authenticatedUser, storedUser) => {
    return authenticatedUser && storedUser?.role === Role.ADMIN;
  }),
  usersController.search
);

export default router;
