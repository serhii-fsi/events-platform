export class AppError extends Error {
  private readonly cause: Error | undefined;

  constructor(message: string, cause?: Error) {
    super(message);
    this.name = this.constructor.name;
    // If we have a cause, we should log and report it
    // because it's a bug in our code
    this.cause = cause;
  }

  public getCause(): Error | undefined {
    return this.cause;
  }
}
