export const config = {
  // App mode
  PROD_MODE: process.env.PROD_MODE as string,
  DEV_MODE: process.env.DEV_MODE as string,
  TEST_MODE: process.env.TEST_MODE as string,

  // Production config for compose.prod.yml
  // DB
  PROD_POSTGRES_PORT: process.env.PROD_POSTGRES_PORT as string,
  PROD_POSTGRES_USER: process.env.PROD_POSTGRES_USER as string,
  PROD_POSTGRES_PASSWORD: process.env.PROD_POSTGRES_PASSWORD as string,
  PROD_POSTGRES_DB: process.env.PROD_POSTGRES_DB as string,
  // App: api
  PROD_API_HOST: process.env.PROD_API_HOST as string,
  PROD_API_PORT: process.env.PROD_API_PORT as string,
  // App: client
  PROD_CLIENT_HOST: process.env.PROD_CLIENT_HOST as string,
  PROD_CLIENT_PORT: process.env.PROD_CLIENT_PORT as string,

  // Development config for compose.dev.yml
  // DB
  DEV_POSTGRES_PORT: process.env.DEV_POSTGRES_PORT as string,
  DEV_POSTGRES_USER: process.env.DEV_POSTGRES_USER as string,
  DEV_POSTGRES_PASSWORD: process.env.DEV_POSTGRES_PASSWORD as string,
  DEV_POSTGRES_DB: process.env.DEV_POSTGRES_DB as string,
  // App: api
  DEV_API_HOST: process.env.DEV_API_HOST as string,
  DEV_API_PORT: process.env.DEV_API_PORT as string,
  // App: client
  DEV_CLIENT_HOST: process.env.DEV_CLIENT_HOST as string,
  DEV_CLIENT_PORT: process.env.DEV_CLIENT_PORT as string,

  // Test config for compose.api-e2e.yml
  // DB
  APIE2E_POSTGRES_PORT: process.env.APIE2E_POSTGRES_PORT as string,
  APIE2E_POSTGRES_USER: process.env.APIE2E_POSTGRES_USER as string,
  APIE2E_POSTGRES_PASSWORD: process.env.APIE2E_POSTGRES_PASSWORD as string,
  APIE2E_POSTGRES_DB: process.env.APIE2E_POSTGRES_DB as string,
  // App: api
  APIE2E_API_HOST: process.env.APIE2E_API_HOST as string,
  APIE2E_API_PORT: process.env.APIE2E_API_PORT as string,

  // Test: for compose.client-e2e.yml
  // DB
  CLIENTE2E_POSTGRES_PORT: process.env.CLIENTE2E_POSTGRES_PORT as string,
  CLIENTE2E_POSTGRES_USER: process.env.CLIENTE2E_POSTGRES_USER as string,
  CLIENTE2E_POSTGRES_PASSWORD: process.env
    .CLIENTE2E_POSTGRES_PASSWORD as string,
  CLIENTE2E_POSTGRES_DB: process.env.CLIENTE2E_POSTGRES_DB as string,
  // App: api
  CLIENTE2E_API_HOST: process.env.CLIENTE2E_API_HOST as string,
  CLIENTE2E_API_PORT: process.env.CLIENTE2E_API_PORT as string,
  // App: client
  CLIENTE2E_CLIENT_HOST: process.env.CLIENTE2E_CLIENT_HOST as string,
  CLIENTE2E_CLIENT_PORT: process.env.CLIENTE2E_CLIENT_PORT as string,
  // App: client-e2e
  CLIENTE2E_REPORT_HOST: process.env.CLIENTE2E_REPORT_HOST as string,
  CLIENTE2E_REPORT_PORT: process.env.CLIENTE2E_REPORT_PORT as string,

  // Auth0 configuration
  AUTH0_SECRET: process.env.AUTH0_SECRET as string,
  AUTH0_BASE_URL: process.env.AUTH0_BASE_URL as string,
  AUTH0_ISSUER_BASE_URL: process.env.AUTH0_ISSUER_BASE_URL as string,
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID as string,
  AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET as string,
  AUTH0_REDIRECT_URL: process.env.AUTH0_REDIRECT_URL as string,
  AUTH0_CALLBACK_PATH: process.env.AUTH0_CALLBACK_PATH as string,
  AUTH0_LOGIN_PATH: process.env.AUTH0_LOGIN_PATH as string,
  AUTH0_LOGOUT_PATH: process.env.AUTH0_LOGOUT_PATH as string,
  AUTH0_REDIRECT_PATH: process.env.AUTH0_REDIRECT_PATH as string,

  API_URL: process.env.API_URL as string,
  CLIENT_URL: process.env.CLIENT_URL as string,
} as const;

// Type-safe environment variables
export const getEnv = () => {
  return {
    ...config,
  };
};

export default getEnv();
