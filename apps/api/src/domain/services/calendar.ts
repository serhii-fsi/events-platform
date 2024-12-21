import { AppError, InternalServerError, NotFoundError } from '../errors';
import calendarRepository from '../../infrastructure/repositories/calendar';
import { UserId, EventId, Calendar } from '../types';
import { ERRORS } from '../constants';

export const calendarService = {
  getStatus: async (userId: UserId, eventId: EventId): Promise<Calendar> => {
    try {
      const calendar = await calendarRepository.findByUserAndEvent(
        userId,
        eventId
      );

      if (!calendar) {
        throw new NotFoundError(ERRORS.ATTENDANCE_NOT_FOUND);
      }

      return calendar;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new InternalServerError(ERRORS.FETCH_ATTENDANCE, error as Error);
      }
    }
  },
};
