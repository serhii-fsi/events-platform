import { checkSeedData } from './seeds/checkSeedData';

export const checkTables = async () => {
  try {
    await checkSeedData();
    return true;
  } catch (error: any) {
    if (error.code === '42P01') {
      return false;
    } else {
      // Re-throw if it's a different error because we don't know how to handle it
      throw error;
    }
  }
};
