export class AppError extends Error {
  private readonly cause: Error | undefined;

  constructor(message: string, cause?: Error) {
    super(message);
    this.name = this.constructor.name;
    this.cause = cause;
  }

  public getCause(): Error | undefined {
    return this.cause;
  }
}
