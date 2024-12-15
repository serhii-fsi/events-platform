import * as OpenApiValidator from 'express-openapi-validator';
import { getRootPath } from '../common/utils/getRootPath';

export const validator = OpenApiValidator.middleware({
  apiSpec: getRootPath() + 'apps/api/src/openapi/schemas/schema.yaml',
  validateRequests: true,
  validateResponses: true,
});
