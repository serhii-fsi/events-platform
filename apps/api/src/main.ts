import express from 'express';
import validator from './infrastructure/api/openapi/validator/middleware';
import { setupSwagger } from './infrastructure/api/openapi/swagger';
import { setupDb } from './infrastructure/db/setupDb';
import { auth } from 'express-openid-connect';

const app = express();

// Middleware
app.use(express.json());
// - Swagger
setupSwagger(app);
// - Seed, purge db dev and test mode functionality
import setupRoutes from './infrastructure/api/routes/setup';
app.use(setupRoutes);

// - Auth router attaches /login, /logout, and /callback routes to the baseURL
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.AUTH0_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
};
app.use(auth(config));
// TEMPORARILY
app.get('/test', (req, res) => {
  res.send(`
    <h1>${req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out'}</h1>
    <h2><a href="/login" target="_blank">Login</a></h2>
    <h2><a href="/logout" target="_blank">Logout</a></h2>
    <pre>User: ${
      req.oidc.user ? JSON.stringify(req.oidc.user, null, 2) : 'None'
    }<pre>
    `);
});
// TEMPORARILY

// - Express openapi validator
app.use(validator);

// Create tables if they don't exist and seed db
setupDb();

import routesV1 from './infrastructure/api/routes/v1';
app.use(routesV1);

import { errorHandler } from './infrastructure/api/middleware/errorHandler';
app.use(errorHandler);

const host = process.env.HOST;
const port = Number(process.env.PORT);
app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
