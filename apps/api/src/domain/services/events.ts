import { InternalServerError, BadRequestError } from '../errors';
import eventsRepository from '../../infrastructure/repositories/events';
import {
  BaseEventEntity,
  DetailedEventEntity,
  PaginatedResult,
} from '../types';
import { AppError } from '../errors';
import { ERRORS } from '../constants';

export const eventValidator = {
  validateDateRange: (event: BaseEventEntity): boolean => {
    if (event.startAt.getTime() < event.endAt.getTime()) return true;
    return false;
  },
  // We don't need to validate:
  // TITLE_MAX_LENGTH, DESCRIPTION_MAX_LENGTH, LOCATION_MAX_LENGTH
  // as they are validated by the openapi express-validator middleware
};

export const eventsService = {
  getMany: async (
    page: number,
    limit: number
  ): Promise<PaginatedResult<BaseEventEntity>> => {
    try {
      const skip = (page - 1) * limit;
      const take = limit;
      const res = await eventsRepository.findMany({ skip, take });

      res.items.forEach((event) => {
        if (!eventValidator.validateDateRange(event)) {
          throw new InternalServerError(
            ERRORS.INVALID_DATE_RANGE,
            new Error(
              'Database consistency error. Event:' + JSON.stringify(event)
            )
          );
        }
      });

      return {
        items: res.items,
        pagination: {
          totalItems: res.totalItems,
          totalPages: Math.ceil(res.totalItems / take),
          currentPage: Math.floor(skip / take) + 1,
        },
      };
    } catch (error) {
      // Repository can also throw a domain errors (AppError subclass)
      // If we work with such repository, we have to check Is it a domain error?
      //   If yes, we should just rethrow it
      //   if no, we should create a domain error, set cause and rethrow it,
      //     it will be caught, logged and transformed to an HTTP error
      //     by infrastructure layer
      if (error instanceof AppError) {
        // This code is an example of how to handle domain errors
        // For this service, we don't need it as used repository doesn't throw domain errors
        throw error;
      } else {
        throw new InternalServerError(
          ERRORS.FETCH_EVENTS,
          error as Error // Add unexpected error as a cause to inform about a problem
        );
      }
    }
  },

  create: async (event: DetailedEventEntity): Promise<DetailedEventEntity> => {
    try {
      if (!eventValidator.validateDateRange(event)) {
        throw new BadRequestError(ERRORS.INVALID_DATE_RANGE);
      }

      return await eventsRepository.create(event);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new InternalServerError(
          ERRORS.CREATE_EVENT,
          error as Error // Add unexpected error as a cause to inform about a problem
        );
      }
    }
  },
};
