import { headers } from 'next/headers';
import { ENV } from '@/utils/env';

export interface ApiResult<Dto> {
  data: Dto | null;
  text: string | null;
  status: number | null;
  error: { message: string | null; obj: Error | null };
}

class Api<Dto> {
  private result: ApiResult<Dto>;
  private path: string;
  private options: RequestInit;

  constructor(path: string, options = {} as RequestInit) {
    this.result = {
      data: null,
      text: null,
      status: null,
      error: { message: null, obj: null },
    };
    this.path = path;
    this.options = options;
  }

  public async fetch(): Promise<Api<Dto>> {
    if (!this.options.cache) this.options.cache = 'no-store';
    if (!this.options.headers) this.options.headers = {};

    this.options.headers = {
      ...this.options.headers,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    } as HeadersInit;

    // https://stackoverflow.com/questions/76285120/error-dynamic-server-usage-headers-on-next-13-4
    const requestHeaders = headers();
    const cookie = requestHeaders.get('cookie');
    if (cookie) {
      this.options.headers = {
        ...this.options.headers,
        cookie,
      } as HeadersInit;
    }

    let res: Response;
    try {
      console.log(
        'fetching',
        `${ENV.API_PROTOCOL}://${ENV.API_HOST}:${ENV.API_PORT}${this.path}`
      );

      res = await fetch(
        `${ENV.API_PROTOCOL}://${ENV.API_HOST}:${ENV.API_PORT}${this.path}`,
        this.options
      );
    } catch (error: any) {
      this.result.error.obj = error;
      return this;
    }

    this.result.status = res.status;
    this.result.text = await res.text();

    if (!res.headers.get('content-type')?.includes('application/json')) {
      return this;
    }

    let json;
    try {
      json = JSON.parse(this.result.text);
    } catch (error: any) {
      this.result.error.obj = error;
      return this;
    }

    if (res.ok) {
      this.result.data = json;
    } else {
      this.result.error.message = json.error;
    }

    return this;
  }

  public getData(): Dto | null {
    return this.result.data;
  }

  public isError(): boolean {
    return this.result?.data === null;
  }

  public isUnexpectedError(): boolean {
    return this.isError() && this.result.error.obj !== null;
  }

  public isApiRegularError(): boolean {
    return (
      this.isError() &&
      this.result.status !== null &&
      this.result.error.message !== null
    );
  }

  public isApiValidatorError(): boolean {
    return (
      this.isError() &&
      !this.isApiRegularError() &&
      (this.result.text?.length ?? 0) > 5
    );
  }

  public getUiErrorMessage(): string {
    if (this.isApiRegularError()) {
      return `Error ${this.result.status}: ${this.result.error.message}`;
    } else if (this.isApiValidatorError()) {
      return 'Validation error: ' + this.result.text;
    } else {
      return 'Unexpected error occurred';
    }
  }

  public getDebugErrorMessage(): string {
    if (this.isUnexpectedError()) {
      return `Debug error: message - ${this.result.error.obj?.message}, stack - ${this.result.error.obj?.stack}`;
    } else {
      return 'No debug error';
    }
  }

  public isNotFound(): boolean {
    return this.result.status === 404;
  }

  public getDebugObj(): ApiResult<Dto> {
    return this.result;
  }
}

export { Api };
