import { Body, Controller, Post } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { StartWorkOutDto } from './dto/startWorkout.dto';
import { CustomResponse } from '../commons/dto/customResponse.dto';

@Controller('workout')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @Post('sessions/start')
  async workoutStart(@Body() body: StartWorkOutDto): Promise<CustomResponse> {
    return this.workoutService.workoutStart(body);
  }

  @Post('set/add')
  async workoutSetAdd(@Body() body) {
    return this.workoutService.workoutSetAdd(body);
  }
}
