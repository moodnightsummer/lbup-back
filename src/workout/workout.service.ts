import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomResponse } from '@/commons/dto/customResponse.dto';
import { DataSource } from 'typeorm';
import { StartWorkOutDto } from './dto/startWorkout.dto';
import { WorkoutSession } from '@/database/entity/WorkoutSession';
import * as dayjs from 'dayjs';
import { User } from '@/database/entity/User';
import { userCode } from '@/commons/enums/errorCode';
import { AddWorkoutSetDto } from './dto/addWorkoutSet.dto';
import { WorkoutSet } from '@/database/entity/WorkoutSet';

@Injectable()
export class WorkoutService {
  constructor(private readonly dataSource: DataSource) {}

  async userCheck(userId: string) {
    const userRepo = await this.dataSource.getRepository(User);
    const user = await userRepo.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException({
        code: userCode.userNotFound,
        message: '잘못된 접근입니다.',
      });
    }
    return user;
  }

  async workoutStart(body: StartWorkOutDto): Promise<CustomResponse> {
    const user = await this.userCheck(body.id);

    const result = await this.dataSource.getRepository(WorkoutSession);
    const today = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss');
    await result.save({
      user: { id: user.id },
      workoutDate: dayjs(new Date()).format('YYYY-MM-DD'),
      startedAt: today,
      createdAt: today,
    });

    return new CustomResponse(true, null, {
      message: `${today}! 운동이 시작되었습니다. 💪🏻`,
    });
  }

  async workoutSetAdd(body: AddWorkoutSetDto): Promise<CustomResponse> {
    const result = await this.dataSource.getRepository(WorkoutSet);

    console.log(body);

    await result.save({
      exercise: { id: body.exerciseId },
      setNumber: body.setNumber,
      weight: body.weight,
      reps: body.reps,
      isSuccess: body.isSuccess,
      isRecommended: body.isRecommended,
      restSeconds: body.restSeconds,
    });

    return new CustomResponse(true);
  }
}
