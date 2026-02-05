import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WorkoutModule } from './workout/workout.module';
import { ExerciseModule } from './exercise/exercise.module';
import { RuleModule } from './rule/rule.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `env/${process.env.NODE_ENV || 'dev'}.env`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: typeORMConfig,
      inject: [ConfigService],
    }),
    WorkoutModule,
    ExerciseModule,
    RuleModule,
  ],
})
export class AppModule {}
