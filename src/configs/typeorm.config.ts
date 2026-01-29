import { ConfigService } from '@nestjs/config';
import 'reflect-metadata';
import { Exercise } from '../database/\bentity/Exercises';
import { Inbody } from '../database/\bentity/Inbody';
import { User } from '../database/\bentity/User';
import { WeightRecommendationLog } from '../database/\bentity/WeightRecommendationLog';
import { WorkoutSession } from '../database/\bentity/WorkoutSession';
import { WorkoutSet } from '../database/\bentity/WorkoutSet';

export const typeORMConfig: any = (configService: ConfigService) => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'), // PostgreSQL 서버 주소
  port: configService.get<string>('DB_POST'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DATABASE'),
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
  migrations: [`${__dirname}/../../database/migration/*.{js,ts}`],
  subscribers: [`${__dirname}/../../database/subscribers/*.{js,ts}`],
});
