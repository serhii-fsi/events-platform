import { AppError, InternalServerError, NotFoundError } from '../errors';
import attendanceRepository from '../../infrastructure/repositories/attendance';
import { UserId, EventId, Attendance } from '../types';
import { AttendanceStatus, ERRORS } from '../constants';
import { eventsService } from './events';

export const attendanceService = {
  getStatus: async (userId: UserId, eventId: EventId): Promise<Attendance> => {
    try {
      const attendance = await attendanceRepository.findByUserAndEvent(
        userId,
        eventId
      );

      if (!attendance) {
        throw new NotFoundError(ERRORS.ATTENDANCE_NOT_FOUND);
      }

      return attendance;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new InternalServerError(ERRORS.FETCH_ATTENDANCE, error as Error);
      }
    }
  },

  setStatus: async (
    userId: UserId,
    eventId: EventId,
    status: AttendanceStatus
  ): Promise<Attendance> => {
    try {
      try {
        await eventsService.getById(eventId);
      } catch (error) {
        if (
          error instanceof AppError &&
          error.message === ERRORS.EVENT_NOT_FOUND
        ) {
          throw error;
        } else {
          throw new InternalServerError(
            ERRORS.CREATE_ATTENDANCE,
            error as Error
          );
        }
      }

      return await attendanceRepository.setStatus(userId, eventId, status);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new InternalServerError(ERRORS.UPDATE_ATTENDANCE, error as Error);
      }
    }
  },
};
