import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from './entity/User';
import { Exercise } from './entity/Exercises';
import { Inbody } from './entity/Inbody';
import { WeightRecommendationLog } from './entity/WeightRecommendationLog';
import { WorkoutSession } from './entity/WorkoutSession';
import { WorkoutSet } from './entity/WorkoutSet';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: true,

  entities: [
    User,
    Exercise,
    Inbody,
    WeightRecommendationLog,
    WorkoutSession,
    WorkoutSet,
  ],
  migrations: ['src/database/migration/**/*.ts'],
});
