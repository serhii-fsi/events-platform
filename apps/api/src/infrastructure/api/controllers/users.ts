import { Request, Response, NextFunction } from 'express';
import { UserEntity } from '../../../domain/types';
import {
  UserDto,
  SearchQuery,
  SearchQueryDto,
  SearchUsersResponseDto,
} from '../types/dto';
import { usersService } from '../../../domain/services/users';

export const mapUserToDto = (user: UserEntity): UserDto => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
  createdAt: user.createdAt?.toISOString(),
  updatedAt: user.updatedAt?.toISOString(),
});

export const usersController = {
  search: async (
    req: Request<SearchQueryDto, SearchUsersResponseDto>,
    res: Response<SearchUsersResponseDto>,
    next: NextFunction
  ) => {
    try {
      const searchTerm: SearchQuery = String(req.query.search) as string;
      const users = await usersService.searchUsers(searchTerm, 20); // Hardcoded limit 20

      return res.status(200).json({
        data: {
          users: users.map(mapUserToDto),
        },
      });
    } catch (error) {
      next(error);
    }
  },
};
