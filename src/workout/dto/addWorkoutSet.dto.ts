import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
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
  isRecommended: boolean;

  @IsInt()
  restSeconds: number;

  @IsNotEmpty()
  @IsUUID()
  sessionId: string;
}
