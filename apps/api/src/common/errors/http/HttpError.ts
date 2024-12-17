import { AppError } from '../app/';
import { ErrorResponseDto } from '../../types/dto';

export class HttpError extends AppError {
  readonly statusCode: number;
  constructor(statusCode: number, message: string, cause?: Error) {
    super(message, cause);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }

  toDTO() {
    const errorResponse: ErrorResponseDto = {
      error: this.message,
    };
    return errorResponse;
  }
}
