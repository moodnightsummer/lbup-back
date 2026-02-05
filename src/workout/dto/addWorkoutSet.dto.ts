import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class AddWorkoutSetDto {
  @IsNotEmpty()
  @IsUUID()
  exerciseId: string;

  @IsNumber()
  setNumber: number;

  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
  })
  weight: number;

  @IsInt()
  reps: number;

  @IsBoolean()
  isSuccess: boolean;

  @IsBoolean()
  @Type(() => Boolean)
  isRecommended: boolean;

  @IsInt()
  restSeconds: number;

  @IsNotEmpty()
  @IsUUID()
  sessionId: string;

  @IsOptional()
  @IsUUID()
  recommendationLogId?: string;
}
