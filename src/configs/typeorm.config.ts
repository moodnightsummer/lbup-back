import { ConfigService } from '@nestjs/config';
import 'reflect-metadata';
import { Exercise } from '../database/entity/Exercises';
import { Inbody } from '../database/entity/Inbody';
import { User } from '../database/entity/User';
import { WeightRecommendationLog } from '../database/entity/WeightRecommendationLog';
import { WorkoutSession } from '../database/entity/WorkoutSession';
import { WorkoutSet } from '../database/entity/WorkoutSet';

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
