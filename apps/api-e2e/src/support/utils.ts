import axios from 'axios';

export const request = async (
  method: 'get' | 'post' | 'put' | 'delete' | 'patch',
  url: string,
  // eslint-disable-next-line
  config?: any
) => {
  if (config?.token) {
    config.headers = { TestAuthorization: config.token };
    delete config.token;
  }
  return config ? axios({ method, url, ...config }) : axios({ method, url });
};

export const seedDb = async () => {
  return request('get', '/seed-db');
};

export const purgeDb = async () => {
  return request('get', '/purge-db');
};
