import * as dotenv from 'dotenv';

const loadEnvVariables = () => {
  const result = dotenv.config({
    path: __dirname.split('apps/client/')[0] + '.env',
  });

  if (result.error || !result.parsed) {
    throw new Error('Failed to load .env file');
  }

  return result.parsed || {};
};

export const ENV = loadEnvVariables();
