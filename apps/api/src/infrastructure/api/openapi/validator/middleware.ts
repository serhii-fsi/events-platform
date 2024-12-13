import { middleware } from 'express-openapi-validator';
import { getRootPath } from '../../../utils/getRootPath';

export default middleware({
  apiSpec:
    getRootPath() + 'apps/api/src/infrastructure/api/openapi/schema.yaml',
  validateRequests: true,
  validateResponses: true,
  validateApiSpec: true,
  ignorePaths: /^\/api-docs|^\/seed-db\/{0,1}$|^\/purge-db\/{0,1}$/,
});
