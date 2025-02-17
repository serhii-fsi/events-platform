import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../../domain/errors';
import { HttpError } from '../errors/HttpError';
import { mapToHttpError } from '../errors/mapToHttpError';
import { checkIsValidatorError } from '../openapi/validator/checkIsValidatorError';

export const errorHandler = (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let httpError;

  if (!(error instanceof AppError)) {
    if (checkIsValidatorError(error)) {
      // The error comes from the express-openapi-validator
      httpError = new HttpError(
        error['status'],
        `${error['name']} - ${error['message']}`
      );
    } else {
      console.error('Unexpected critical error:', '\n', error);

      httpError = new HttpError(500, 'Unexpected critical error');
    }
  } else {
    if (error.getCause()) {
      console.error('Unexpected critical error:', '\n', error);
    }

    httpError = mapToHttpError(error);

    if (!httpError) {
      console.error('Unexpected error - no http mapping found', '\n', error);

      httpError = new HttpError(
        500,
        `Unexpected error: no http mapping found - ${error['name']}: ${error['message']}`
      );
    }
  }

  return res.status(httpError.statusCode).json(httpError.toDTO());
};
