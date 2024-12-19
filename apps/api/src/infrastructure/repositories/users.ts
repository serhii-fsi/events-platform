import { db } from '../db/connection';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';
import { UserEntity } from '../../domain/types';

export const usersRepository = {
  findUserByEmail: async (email: string): Promise<UserEntity | null> => {
    const [user] = await db
      .select()
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
};
