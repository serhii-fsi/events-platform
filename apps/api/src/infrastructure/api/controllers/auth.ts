import e, { Request, Response, NextFunction } from 'express';
import { UserEntity } from '../../../domain/types';
import { ERRORS } from '../../../domain/constants';
import { InternalServerError, ForbiddenError } from '../../../domain/errors/';
import { AuthStatusResponseDto } from '../types/dto';
import { mapUserToDto } from './users';

export const authController = {
  getStatus: async (
    req: Request,
    res: Response<AuthStatusResponseDto>,
    next: NextFunction
  ) => {
    try {
      const authorisedUser: UserEntity | null = req['AUTHORIZED_USER'];

      if (authorisedUser) {
        return res.status(200).json({
          data: {
            user: mapUserToDto(authorisedUser),
          },
        });
      } else {
        next(new ForbiddenError(ERRORS.AUTHORIZATION_BUG));
      }
    } catch (error) {
      next(new InternalServerError(ERRORS.AUTHORIZATION_BUG, error as Error));
    }
  },
};
