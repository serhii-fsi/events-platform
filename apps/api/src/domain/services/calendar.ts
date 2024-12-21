import { AppError, InternalServerError, NotFoundError } from '../errors';
import calendarRepository from '../../infrastructure/repositories/calendar';
import { UserId, EventId, Calendar } from '../types';
import { CalendarStatus, ERRORS } from '../constants';
import { eventsService } from './events';

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

  setStatus: async (
    userId: UserId,
    eventId: EventId,
    status: CalendarStatus
  ): Promise<Calendar> => {
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

      return await calendarRepository.setStatus(userId, eventId, status);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new InternalServerError(ERRORS.UPDATE_ATTENDANCE, error as Error);
      }
    }
  },
};
