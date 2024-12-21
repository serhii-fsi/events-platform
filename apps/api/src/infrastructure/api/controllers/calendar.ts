import { Request, Response, NextFunction } from 'express';
import {
  CalendarStatusResponseDto,
  CalendarStatusPathDto,
  CalendarStatusDto,
  UserIdPath,
  EventIdPath,
} from '../types/dto';
import { calendarService } from '../../../domain/services/calendar';
import { Calendar } from '../../../domain/types';

const mapCalendarToDto = (calendar: Calendar): CalendarStatusDto => ({
  status: calendar.status,
  createdAt: calendar.createdAt.toISOString(),
  updatedAt: calendar.updatedAt.toISOString(),
});

export const calendarController = {
  getStatus: async (
    req: Request<CalendarStatusPathDto, CalendarStatusResponseDto>,
    res: Response<CalendarStatusResponseDto>,
    next: NextFunction
  ) => {
    try {
      const userId: UserIdPath = Number(req.params.userId);
      const eventId: EventIdPath = Number(req.params.eventId);

      const calendar = await calendarService.getStatus(userId, eventId);

      return res.status(200).json({
        data: {
          calendarStatus: mapCalendarToDto(calendar),
        },
      });
    } catch (error) {
      next(error);
    }
  },
};
