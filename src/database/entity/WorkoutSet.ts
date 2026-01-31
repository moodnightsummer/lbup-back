import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToMany,
} from 'typeorm';
import { WorkoutSession } from './WorkoutSession';
import { Exercise } from './Exercises';
import { WeightRecommendationLog } from './WeightRecommendationLog';

@Entity('workout_sets')
@Index(['session', 'exercise', 'setNumber'], { unique: true })
export class WorkoutSet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => WorkoutSession, (session) => session.sets, {
    onDelete: 'CASCADE',
  })
  session: WorkoutSession;

  @ManyToOne(() => Exercise, (exercise) => exercise.workoutSets, {
    eager: true,
  })
  exercise: Exercise;

  @OneToMany(() => WeightRecommendationLog, (log) => log.set)
  recommendationLogs: WeightRecommendationLog[];

  @Column({ type: 'int' })
  setNumber: number;

  @Column({ type: 'float' })
  weight: number;

  @Column({ type: 'int' })
  reps: number;

  @Column({ default: true })
  isSuccess: boolean;

  @Column({ default: false })
  isRecommended: boolean;

  @Column({ type: 'int', nullable: true })
  restSeconds: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
