import * as CONFIG from '@/utils/getConfig';

export const fetchApi = async (
  path: string,
  options = {
    cache: 'no-store',
  } as RequestInit
) => {
  try {
    const res = await fetch(
      `${CONFIG.API_PROTOCOL}://${CONFIG.API_HOST}:${CONFIG.API_PORT}${path}`,
      options
    );

    const json = await res.json();

    return { json, status: res?.status, error: json?.error as string };
  } catch (error: any) {
    console.error(error);
    return { json: null, status: null, error: error.message as string };
  }
};
