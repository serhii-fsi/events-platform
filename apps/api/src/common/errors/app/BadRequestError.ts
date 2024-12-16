import { AppError } from './';

export class BadRequestError extends AppError {
  constructor(message: string, cause?: Error) {
    super(message, cause);
    this.name = this.constructor.name;
  }
}
