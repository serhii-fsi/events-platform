import axios from 'axios';

export const request = async (
  method: 'get' | 'post' | 'put' | 'delete' | 'patch',
  url: string,
  data?: any,
  token?: string
) => {
  const config = token ? { headers: { TestAuthorization: `${token}` } } : {};
  return axios({ method, url, data, ...config });
};

export const seedDb = async () => {
  return request('get', '/seed-db');
};

export const purgeDb = async () => {
  return request('get', '/purge-db');
};
