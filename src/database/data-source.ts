import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from './\bentity/User';
import { Exercise } from './\bentity/Exercises';
import { Inbody } from './\bentity/Inbody';
import { WeightRecommendationLog } from './\bentity/WeightRecommendationLog';
import { WorkoutSession } from './\bentity/WorkoutSession';
import { WorkoutSet } from './\bentity/WorkoutSet';

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
