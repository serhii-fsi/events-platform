import { UserEntity, UserId } from '../types';
import { ERRORS } from '../constants';
import { AppError, InternalServerError, NotFoundError } from '../errors';
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

  update: async (
    id: UserId,
    updates: Partial<UserEntity>
  ): Promise<UserEntity> => {
    try {
      const existingUser = await usersRepository.findById(id);

      if (!existingUser) {
        throw new NotFoundError(ERRORS.USER_NOT_FOUND);
      }

      return await usersRepository.update(id, updates);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new InternalServerError(ERRORS.UPDATE_USER, error as Error);
      }
    }
  },

  getById: async (id: UserId): Promise<UserEntity> => {
    try {
      const user = await usersRepository.findById(id);

      if (!user) {
        throw new NotFoundError(ERRORS.USER_NOT_FOUND);
      }

      return user;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new InternalServerError(ERRORS.FETCH_USER, error as Error);
      }
    }
  },
};
