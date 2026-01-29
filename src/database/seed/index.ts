import { AppDataSource } from '../data-source';
import { seedExercises } from './exercise.seed';

async function runSeeds() {
  await AppDataSource.initialize();

  await seedExercises(AppDataSource);

  await AppDataSource.destroy();

  process.exit(0);
}

runSeeds().catch((err) => {
  console.error(err);
  process.exit(1);
});
