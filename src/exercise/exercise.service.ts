import { Injectable } from '@nestjs/common';
import { CustomResponse } from '../commons/dto/customResponse.dto';
import { DataSource } from 'typeorm';
import { Exercise } from '../database/\bentity/Exercises';

@Injectable()
export class ExerciseService {
  constructor(private readonly dataSource: DataSource) {}

  async exerciseList(): Promise<CustomResponse> {
    const repo = await this.dataSource.getRepository(Exercise);
    const result = await repo.find();

    return new CustomResponse(true, result);
  }
}
