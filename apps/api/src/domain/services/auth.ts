import { UserEntity, AuthenticatedUser } from '../types';
import { InternalServerError } from '../errors';
import { Role, ERRORS } from '../constants';
import { usersRepository } from '../../infrastructure/repositories/users';

export const authService = {
  getStoredUser: async (
    authenticatedUser: AuthenticatedUser
  ): Promise<UserEntity> => {
    let user: UserEntity;
    try {
      user = await usersRepository.findUserByEmail(authenticatedUser.email);
    } catch (error) {
      throw new InternalServerError(ERRORS.AUTHORIZATION_BUG, error as Error);
    }

    // If user is not found, create a new one
    // because it's the first time the authenticated user logs in
    try {
      if (!user) {
        user = await usersRepository.create({
          name: authenticatedUser.name,
          email: authenticatedUser.email,
          role: Role.USER,
        });
      }
    } catch (error) {
      throw new InternalServerError(ERRORS.AUTHORIZATION_BUG, error as Error);
    }

    if (!user) {
      throw new InternalServerError(
        ERRORS.AUTHORIZATION_BUG,
        new Error('Unexpected error')
      );
    }

    return user;
  },
};
