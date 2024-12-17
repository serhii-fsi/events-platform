import {
  AppError,
  BadRequestError,
  ForbiddenError,
  InternalServerError,
  NotAcceptableError,
  NotFoundError,
  UnauthorizedError,
} from '../../../domain/errors';
import { HttpError } from './HttpError';

export const mapToHttpError = (error: AppError): HttpError | null => {
  if (error instanceof BadRequestError) {
    return new HttpError(400, error.message, error.getCause());
  }

  if (error instanceof ForbiddenError) {
    return new HttpError(403, error.message, error.getCause());
  }

  if (error instanceof InternalServerError) {
    return new HttpError(500, error.message, error.getCause());
  }

  if (error instanceof NotAcceptableError) {
    return new HttpError(406, error.message, error.getCause());
  }

  if (error instanceof NotFoundError) {
    return new HttpError(404, error.message, error.getCause());
  }

  if (error instanceof UnauthorizedError) {
    return new HttpError(401, error.message, error.getCause());
  }

  return null;
};
