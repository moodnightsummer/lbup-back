import {
  ExerciseCategory,
  EquipmentType,
  MuscleGroup,
} from '../../commons/enums/muscle';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { WorkoutSet } from './WorkoutSet';

@Entity('exercises')
export class Exercise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  englishName: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({
    type: 'enum',
    enum: MuscleGroup,
  })
  primaryMuscle: MuscleGroup;

  @Column({
    type: 'enum',
    enum: ExerciseCategory,
  })
  category: ExerciseCategory;

  @Column({
    type: 'enum',
    enum: EquipmentType,
  })
  equipment: EquipmentType;

  @Column({ type: 'int', default: 90 })
  defaultRestSeconds: number;

  @Column({ type: 'float', default: 2.5 })
  incrementUnit: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => WorkoutSet, (set) => set.exercise)
  workoutSets: WorkoutSet[];
}
