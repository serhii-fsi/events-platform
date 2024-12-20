import { Request, Response, NextFunction } from 'express';
import {
  AppError,
  UnauthorizedError,
  InternalServerError,
  ForbiddenError,
} from '../../../domain/errors/';
import { authService } from '../../../domain/services/auth';
import { UserEntity, AuthenticatedUser } from '../../../domain/types';
import { ERRORS } from '../../../domain/constants';
import { TEST_MODE } from '../../utils/appMode';

export const auth =
  (
    canAccess: (
      req: Request,
      authenticatedUser: AuthenticatedUser | null,
      storedUser: UserEntity | null
    ) => boolean
  ) =>
  async (req, res: Response, next: NextFunction) => {
    // ----------- TEST MODE -----------
    if (TEST_MODE) {
      const authHeader = req.header('TestAuthorization');
      if (authHeader?.length > 5) {
        const { name, email } = JSON.parse(authHeader);
        req.oidc = {
          isAuthenticated: () => true,
          user: {
            name: name,
            email: email,
            email_verified: true,
          },
          // eslint-disable-next-line
        } as any;
      }
    }
    // ----------- TEST MODE -----------

    let authenticatedUser: AuthenticatedUser | null = null;
    let storedUser: UserEntity | null = null;

    const tryAccess = (err: AppError) => {
      if (canAccess(req, authenticatedUser, storedUser)) {
        // Add for target controller
        req['AUTHENTICATED_USER'] = authenticatedUser;
        req['AUTHORIZED_USER'] = storedUser;
        next();
        return;
      } else {
        next(err);
        return;
      }
    };

    // For not public endpoints, check if user is authenticated
    try {
      if (
        !req.oidc.isAuthenticated() ||
        !req.oidc?.user ||
        !req.oidc?.user?.email_verified
      ) {
        tryAccess(new UnauthorizedError(ERRORS.AUTHENTICATION));
        return;
      }

      // Need AuthenticatedUser to avoid using req.oidc.user directly
      // to make it easier to change the authentication provider in the future.
      authenticatedUser = {
        name: req.oidc?.user?.name,
        picture: req.oidc?.user?.picture,
        email: req.oidc?.user?.email,
      };
    } catch (error) {
      tryAccess(
        new InternalServerError(ERRORS.AUTHENTICATION_BUG, error as Error)
      );
      return;
    }

    // On this step, we know that the user is authenticated

    try {
      // Service emits an error if user is not authorized
      storedUser = await authService.getStoredUser(authenticatedUser);

      tryAccess(new ForbiddenError(ERRORS.AUTHORIZATION));
      return;
    } catch (error) {
      tryAccess(error);
      return;
    }
  };
