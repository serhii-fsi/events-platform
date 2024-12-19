import { UserEntity } from '../../../domain/types';
import { UserDto } from '../types/dto';

export const mapUserToDto = (user: UserEntity): UserDto => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
  createdAt: user.createdAt?.toISOString(),
  updatedAt: user.updatedAt?.toISOString(),
});
