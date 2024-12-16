import { AppError } from '../app/';

export class HttpError extends AppError {
  readonly statusCode: number;
  constructor(statusCode: number, message: string, cause?: Error) {
    super(message, cause);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }

  toDTO() {
    return {
      error: this.message,
    };
  }
}
