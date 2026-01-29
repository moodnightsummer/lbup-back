import { Controller, Get } from '@nestjs/common';
import { ExerciseService } from './exercise.service';

@Controller('exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Get('info')
  async exerciseList() {
    return this.exerciseService.exerciseList();
  }
}
