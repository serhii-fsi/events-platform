import { Request, Response, NextFunction } from 'express';
import {
  PageQuery,
  LimitQuery,
  BaseEventDto,
  DetailedEventDto,
  CreateEventRequestDto,
  EventsListResponseDto,
  DetailedEventResponseDto,
} from '../types/dto';
import { eventsService } from '../../../domain/services/events';
import { BaseEventEntity, DetailedEventEntity } from '../../../domain/entities';
import { PAGINATION } from '../../../domain/constants';

const mapBaseEventToDto = (event: BaseEventEntity): BaseEventDto => ({
  id: event.id,
  title: event.title,
  startAt: event.startAt.toISOString(),
  endAt: event.endAt.toISOString(),
  location: event.location,
  createdAt: event.createdAt.toISOString(),
  updatedAt: event.updatedAt.toISOString(),
});

const mapDetailedEventToDto = (
  event: DetailedEventEntity
): DetailedEventDto => ({
  ...mapBaseEventToDto(event),
  description: event.description,
});

export const eventsController = {
  getMany: async (
    req: Request<object, EventsListResponseDto>,
    res: Response<EventsListResponseDto>,
    next: NextFunction
  ) => {
    try {
      const page: PageQuery = Number(req.query.page) || PAGINATION.DEFAULT_PAGE;
      const limit: LimitQuery =
        Number(req.query.limit) || PAGINATION.DEFAULT_LIMIT;

      const { items, pagination } = await eventsService.getMany(page, limit);

      return res.status(200).json({
        data: {
          events: items.map(mapBaseEventToDto),
        },
        meta: {
          pagination: {
            totalPages: pagination.totalPages,
            currentPage: pagination.currentPage,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  },

  create: async (
    req: Request<object, DetailedEventResponseDto, CreateEventRequestDto>,
    res: Response<DetailedEventResponseDto>,
    next: NextFunction
  ) => {
    try {
      const requestDto: CreateEventRequestDto = req.body;

      const detailedEventEntity: DetailedEventEntity = {
        ...requestDto,
        startAt: new Date(requestDto.startAt),
        endAt: new Date(requestDto.endAt),
      };

      const event = await eventsService.create(detailedEventEntity);

      return res.status(201).json({
        data: {
          event: mapDetailedEventToDto(event),
        },
      });
    } catch (error) {
      next(error);
    }
  },
};
