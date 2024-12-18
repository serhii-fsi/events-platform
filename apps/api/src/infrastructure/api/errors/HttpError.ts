import { AppError } from '../../../domain/errors';
import { ErrorResponseDto, ErrorResponseCodes } from '../types/dto';

export class HttpError extends AppError {
  readonly statusCode: ErrorResponseCodes;

  constructor(statusCode: ErrorResponseCodes, message: string, cause?: Error) {
    super(message, cause);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }

  toDTO() {
    const errorResponse: ErrorResponseDto = {
      status: this.statusCode,
      error: this.message,
    };
    return errorResponse;
  }
}
