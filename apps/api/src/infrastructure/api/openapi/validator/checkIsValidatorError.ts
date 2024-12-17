import { HttpError } from 'express-openapi-validator/dist/framework/types';

export function checkIsValidatorError(error: HttpError): boolean {
  if (!error || typeof error !== 'object') {
    return false;
  }

  const requiredKeys = ['message', 'stack', 'status', 'path', 'errors'];
  for (const key of requiredKeys) {
    if (!Object.prototype.hasOwnProperty.call(error, key)) {
      return false;
    }
  }

  if (!Array.isArray(error.errors)) {
    return false;
  }

  return true;
}
