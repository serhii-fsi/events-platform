import express from 'express';
import cors from 'cors';
import { setupSwagger } from './infrastructure/api/openapi/swagger';
import setupRoutes from './infrastructure/api/routes/setup';
import validator from './infrastructure/api/openapi/validator/middleware';
import { setupDb } from './infrastructure/db/setupDb';
import routesV1 from './infrastructure/api/routes/v1';
import { errorHandler } from './infrastructure/api/middleware/errorHandler';
import { useOpenIdAuth } from './infrastructure/utils/openidAuth';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// - Swagger
setupSwagger(app);
// - Seed, purge db dev and test mode functionality
app.use(setupRoutes);
// - OpenId Auth0
useOpenIdAuth(app);
// - Express openapi validator
app.use(validator);

// Create tables if they don't exist and seed db
setupDb();

app.use(routesV1);

app.use(errorHandler);

const host = process.env.HOST;
const port = Number(process.env.PORT);
app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
