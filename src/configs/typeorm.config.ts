import { ConfigService } from '@nestjs/config';
import 'reflect-metadata';

export const typeORMConfig: any = (configService: ConfigService) => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'), // PostgreSQL 서버 주소
  port: configService.get<string>('DB_POST'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DATABASE'),
  synchronize: false,
  logging: true,
  entities: [`${__dirname}/../../database/entity/*.{js,ts}`],
  migrations: [`${__dirname}/../../database/migration/*.{js,ts}`],
  subscribers: [`${__dirname}/../../database/subscribers/*.{js,ts}`],
});
