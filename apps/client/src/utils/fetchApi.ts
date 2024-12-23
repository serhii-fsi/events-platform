import { headers } from 'next/headers';
import env from '@/utils/getEnv';

export const fetchApi = async (path: string, options = {} as RequestInit) => {
  if (!options.cache) options.cache = 'no-store';

  if (!options.headers) options.headers = {};

  // https://stackoverflow.com/questions/76285120/error-dynamic-server-usage-headers-on-next-13-4
  const requestHeaders = headers();
  const cookie = requestHeaders.get('cookie');
  if (cookie) {
    options.headers = {
      ...options.headers,
      cookie,
    } as HeadersInit;
  }

  try {
    console.log(`${env.API_PROTOCOL}://${env.API_HOST}:${env.API_PORT}${path}`);

    const res = await fetch(
      `${env.API_PROTOCOL}://${env.API_HOST}:${env.API_PORT}${path}`,
      options
    );

    const json = await res.json();

    return json;
  } catch (error: any) {
    console.error(error);
    return { error: error.message as string, errorObj: error };
  }
};
