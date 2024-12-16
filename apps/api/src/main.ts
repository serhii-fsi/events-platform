import express from 'express';
import validator from './openapi/validator/middleware';
import { setupSwagger } from './openapi/swagger';
import { setupDb } from './db/setupDb';

const app = express();

app.use(express.json());
app.use(validator);
setupSwagger(app);

// Create tables if they don't exist and seed db
setupDb();

import setupRoutes from './routes/setup';
app.use(setupRoutes);

import routesV1 from './routes/v1';
app.use(routesV1);

import { errorHandler } from './middleware/errorHandler';
app.use(errorHandler);

const host = process.env.HOST;
const port = Number(process.env.PORT);
app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
