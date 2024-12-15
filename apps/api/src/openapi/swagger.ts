import swaggerUi from 'swagger-ui-express';
import * as YAML from 'yamljs';
import { Express } from 'express';

export function setupSwagger(app: Express) {
  const swaggerDocument = YAML.load(
    // We need to use dist/apps/api to get the correct path because the app is running
    // from the dist folder and typscript compiles the code to the dist folder except yaml file
    __dirname.split('dist/apps/api')[0] + 'apps/api/src/openapi/schema.yaml'
  );
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
