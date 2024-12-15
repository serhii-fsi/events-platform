import swaggerUi from 'swagger-ui-express';
import * as YAML from 'yamljs';
import { Express } from 'express';
import { getRootPath } from '../common/utils/getRootPath';

export function setupSwagger(app: Express) {
  const swaggerDocument = YAML.load(
    // We need to use dist/apps/api to get the correct path because the app is running
    // from the dist folder and typscript compiles the code to the dist folder except yaml file
    getRootPath() + 'apps/api/src/openapi/schemas/schema.yaml'
  );
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
