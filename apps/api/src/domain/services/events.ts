import { InternalServerError } from '../errors';
import eventsRepository from '../../infrastructure/repositories/events';
import { BaseEventEntity } from '../entities';
import { PaginatedResult } from '../types';
import { DOMAIN_MESSAGES } from '../constants';
import { AppError } from '../errors';

const validateEvent = (event: BaseEventEntity): void => {
  if (event.startAt.getTime() > event.endAt.getTime()) {
    throw new InternalServerError(
      DOMAIN_MESSAGES.FETCH_EVENTS_ERROR,
      new Error(
        'Event end time must be after start time. Event:' +
          JSON.stringify(event)
      )
    );
  }
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
      const res = await eventsRepository.findMany({
        skip: (page - 1) * limit,
        take: limit,
      });

      res.items.forEach(validateEvent);

      return res;
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
          DOMAIN_MESSAGES.FETCH_EVENTS_ERROR,
          error as Error
        );
      }
    }
  },
};
