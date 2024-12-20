import { AppError, InternalServerError, NotFoundError } from '../errors';
import attendanceRepository from '../../infrastructure/repositories/attendance';
import { UserId, EventId, Attendance } from '../types';
import { ERRORS } from '../constants';

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
};
