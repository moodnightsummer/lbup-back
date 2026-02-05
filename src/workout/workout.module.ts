import { Module } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { WorkoutController } from './workout.controller';
import { RuleModule } from '@/rule/rule.module';

@Module({
  imports: [RuleModule],
  providers: [WorkoutService],
  controllers: [WorkoutController],
})
export class WorkoutModule {}
