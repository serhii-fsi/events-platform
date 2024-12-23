import { auth } from 'express-openid-connect';

export const useOpenIdAuth = (app) => {
  const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH0_SECRET,
    baseURL: process.env.AUTH0_BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    routes: {
      callback: process.env.AUTH0_CALLBACK_PATH,
      login: process.env.AUTH0_LOGIN_PATH,
      logout: process.env.AUTH0_LOGOUT_PATH,
      postLogoutRedirect: process.env.CLIENT_URL,
    },
  };

  app.get(['/', process.env.AUTH0_CALLBACK_PATH], (req, res, next) => {
    if (req?.params?.id_token) next();
    else res.redirect(process.env.CLIENT_URL);
  });

  app.use(auth(config));
};
