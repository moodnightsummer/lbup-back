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
import { RuleEngine } from '@/rule/engine/rule.engine';
import { calcLastPR1RM } from './calc/calcLastPRWeight';
import { calcBaseWeight } from './calc/calcBaseWeight';
import { WeightRecommendationLog } from '@/database/entity/WeightRecommendationLog';
import { log } from 'util';

@Injectable()
export class WorkoutService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly ruleEngine: RuleEngine,
  ) {}

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

    const result = this.dataSource.getRepository(WorkoutSession);
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
    const setRepo = this.dataSource.getRepository(WorkoutSet);
    const sessionRepo = this.dataSource.getRepository(WorkoutSession);

    const session = await sessionRepo.findOne({
      where: { id: body.sessionId },
      relations: ['user'],
    });

    if (!session) {
      throw new NotFoundException('세션을 찾을 수 없습니다.');
    }

    const userId = session.user.id;

    const nowSet = await setRepo.save({
      exercise: { id: body.exerciseId },
      session: { id: body.sessionId },
      setNumber: body.setNumber,
      weight: body.weight,
      reps: body.reps,
      isSuccess: body.isSuccess,
      isRecommended: body.isRecommended,
      restSeconds: body.restSeconds,
    });

    if (body.recommendationLogId) {
      const logRepo = this.dataSource.getRepository(WeightRecommendationLog);

      await logRepo.update(
        { id: body.recommendationLogId }, // 조건
        {
          isFollowed: true,
          set: { id: nowSet.id },
        },
      );
    }

    const sessionSets = await setRepo.find({
      where: {
        session: { id: body.sessionId },
        exercise: { id: body.exerciseId },
      },
      order: { setNumber: 'ASC' },
    });

    const userExerciseSets = await setRepo.find({
      where: {
        session: { user: { id: userId } },
        exercise: { id: body.exerciseId },
        isSuccess: true,
      },
      order: { createdAt: 'DESC' },
      take: 20,
    });

    const lastPR1RM = calcLastPR1RM(
      userExerciseSets.map((s) => ({
        weight: s.weight,
        reps: s.reps,
        isSuccess: s.isSuccess,
        createdAt: s.createdAt,
      })),
    );

    /* PR 없으면 추천 안 함 */
    if (!lastPR1RM) {
      return new CustomResponse(true, null, {
        recommendation: null,
      });
    }

    const baseWeight = calcBaseWeight(
      lastPR1RM,
      sessionSets.map((s) => ({
        weight: s.weight,
        reps: s.reps,
        isSuccess: s.isSuccess,
      })),
    );

    const userStats = {
      lastPR1RM,
      baseWeight,
      avgVolume7d: 0,
    };

    const context = {
      userId,
      sessionId: body.sessionId,
      exerciseId: body.exerciseId,

      currentSet: {
        setNumber: body.setNumber,
        weight: body.weight,
        reps: body.reps,
        isSuccess: body.isSuccess,
        restSeconds: body.restSeconds,
      },

      sessionSets: sessionSets.map((s) => ({
        setNumber: s.setNumber,
        weight: s.weight,
        reps: s.reps,
        isSuccess: s.isSuccess,
        restSeconds: s.restSeconds,
      })),

      userStats,
    };

    const ruleResults = this.ruleEngine.run(context);

    const recommendation =
      ruleResults
        .filter((r): r is NonNullable<typeof r> => r !== null)
        .sort((a, b) => b.confidence - a.confidence)[0] ?? null;

    if (recommendation) {
      const minStep = 1;
      const maxStep = 2.5;
      const randomOffset = Math.random() * (maxStep - minStep) + minStep;

      recommendation.recommendedWeight =
        Math.round((recommendation.recommendedWeight + randomOffset) / 2.5) *
        2.5;

      const logRepo = this.dataSource.getRepository(WeightRecommendationLog);

      const log = await logRepo.save({
        set: null, // 아직 세트 없음
        recommendedWeight: recommendation.recommendedWeight,
        actualWeight: body.weight, // 현재 세트 무게 (참고용)
        isFollowed: false,
        reason: recommendation.reason ?? null,
      });

      return new CustomResponse(true, null, {
        recommendation,
        recommendationLogId: log.id,
      });
    }

    return new CustomResponse(true, null, {
      recommendation,
    });
  }
}
