import { db } from '../connection';
import { users } from '../schema';

export const checkSeedData = async () => {
  const dataExist = await db.select().from(users).limit(10);
  if (dataExist.length > 0) {
    return true;
  }
  return false;
};
