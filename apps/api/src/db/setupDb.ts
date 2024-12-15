import { migrate } from './migrate';
import { seed } from './seeds/seed';
import { checkSeedData } from './seeds/checkSeedData';
import { checkTables } from './checkTables';

export const setupDb = async () => {
  const isTablesExist = await checkTables();
  if (!isTablesExist) {
    console.log('Tables do not exist, running migrations...');
    await migrate();
  }

  const isDataExists = await checkSeedData();
  if (isDataExists) {
    console.log('Data already exists, skipping seed.');
  } else {
    console.log('Data does not exist, running seed...');
    await seed();
  }
};
