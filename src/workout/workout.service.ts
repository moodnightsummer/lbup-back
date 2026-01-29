import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomResponse } from '../commons/dto/customResponse.dto';
import { DataSource } from 'typeorm';
import { StartWorkOutDto } from './dto/startWorkout.dto';
import { WorkoutSession } from '../database/entity/WorkoutSession';
import * as dayjs from 'dayjs';
import { User } from '../database/\bentity/User';

@Injectable()
export class WorkoutService {
  constructor(private readonly dataSource: DataSource) {}

  async workoutStart(body: StartWorkOutDto): Promise<CustomResponse> {
    const userRepo = await this.dataSource.getRepository(User);
    const user = await userRepo.findOne({ where: { id: body.id } });

    if (!user) {
      throw new NotFoundException({
        code: 'USER_NOT_FOUND',
        message: '잘못된 접근입니다.',
      });
    }

    const result = await this.dataSource.getRepository(WorkoutSession);
    const today = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss');
    await result.save({
      user: { id: body.id },
      workoutDate: dayjs(new Date()).format('YYYY-MM-DD'),
      startedAt: today,
      createdAt: today,
    });

    return new CustomResponse(true);
  }

  async workoutSetAdd(body) {}
}
