import { headers } from 'next/headers';
import * as CONFIG from '@/utils/getConfig';

export const fetchApi = async (path: string, options = {} as RequestInit) => {
  try {
    if (!options.cache) options.cache = 'no-store';

    if (!options.headers) options.headers = {};
    const requestHeaders = headers();
    const cookie = requestHeaders.get('cookie');

    if (cookie) {
      options.headers = {
        ...options.headers,
        cookie,
      } as HeadersInit;
    }

    const res = await fetch(
      `${CONFIG.API_PROTOCOL}://${CONFIG.API_HOST}:${CONFIG.API_PORT}${path}`,
      options
    );

    const json = await res.json();

    return json;
  } catch (error: any) {
    console.error(error);
    return { error: error.message as string, errorObj: error };
  }
};
