import { Request, Response, NextFunction } from 'express';
import { UserEntity } from '../../../domain/types';
import { Role } from '../../../domain/constants';
import {
  UserDto,
  SearchQuery,
  SearchQueryDto,
  SearchUsersResponseDto,
  UserIdPath,
  UserIdPathDto,
  UpdateUserRoleRequestDto,
  UserProfileResponseDto,
  UpdateUserProfileRequestDto,
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

  updateRole: async (
    req: Request<
      UserIdPathDto,
      UserProfileResponseDto,
      UpdateUserRoleRequestDto
    >,
    res: Response<UserProfileResponseDto>,
    next: NextFunction
  ) => {
    try {
      const userId: UserIdPath = Number(req.params.userId);
      const role = req.body.role as Role;

      const user = await usersService.update(userId, { role });

      return res.status(200).json({
        data: {
          user: mapUserToDto(user),
        },
      });
    } catch (error) {
      next(error);
    }
  },

  getProfile: async (
    req: Request<UserIdPathDto, UserProfileResponseDto>,
    res: Response<UserProfileResponseDto>,
    next: NextFunction
  ) => {
    try {
      const userId: UserIdPath = Number(req.params.userId);
      const user = await usersService.getById(userId);

      return res.status(200).json({
        data: {
          user: mapUserToDto(user),
        },
      });
    } catch (error) {
      next(error);
    }
  },

  updateProfile: async (
    req: Request<
      UserIdPathDto,
      UserProfileResponseDto,
      UpdateUserProfileRequestDto
    >,
    res: Response<UserProfileResponseDto>,
    next: NextFunction
  ) => {
    try {
      const userId: UserIdPath = Number(req.params.userId);
      const updates = req.body as UpdateUserProfileRequestDto;

      const user = await usersService.update(userId, updates);

      return res.status(200).json({
        data: {
          user: mapUserToDto(user),
        },
      });
    } catch (error) {
      next(error);
    }
  },
};
