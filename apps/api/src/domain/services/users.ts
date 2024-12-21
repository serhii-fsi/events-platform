import { UserEntity } from '../types';
import { ERRORS } from '../constants';
import { AppError, InternalServerError } from '../errors';
import { usersRepository } from '../../infrastructure/repositories/users';

export const usersService = {
  searchUsers: async (
    searchTerm: string,
    limit: number
  ): Promise<UserEntity[]> => {
    try {
      return await usersRepository.findMany(searchTerm, limit);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new InternalServerError(ERRORS.FETCH_USERS, error as Error);
      }
    }
  },
};
