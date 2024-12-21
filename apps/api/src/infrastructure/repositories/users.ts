import { db } from '../db/connection';
import { users } from '../db/schema';
import { eq, ilike, or } from 'drizzle-orm';
import { UserEntity } from '../../domain/types';

export const usersRepository = {
  findUserByEmail: async (email: string): Promise<UserEntity | null> => {
    const [user] = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    return (user || null) as UserEntity | null;
  },

  create: async (user: UserEntity): Promise<UserEntity> => {
    const [created] = await db
      .insert(users)
      .values({
        name: user.name,
        email: user.email,
        role: user.role,
      })
      .returning();

    return created as UserEntity;
  },

  findMany: async (
    searchTerm: string,
    limit: number
  ): Promise<UserEntity[]> => {
    const usersResult = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      })
      .from(users)
      .where(
        or(
          ilike(users.name, `%${searchTerm}%`),
          ilike(users.email, `%${searchTerm}%`)
        )
      )
      .limit(limit);

    return usersResult as UserEntity[];
  },
};
