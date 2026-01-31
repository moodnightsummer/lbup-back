import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { WorkoutSet } from './WorkoutSet';

@Entity('weight_recommendation_logs')
export class WeightRecommendationLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => WorkoutSet, {
    onDelete: 'CASCADE',
  })
  set: WorkoutSet;

  @Column({ type: 'float' })
  recommendedWeight: number;

  @Column({ type: 'float' })
  actualWeight: number;

  @Column({ default: false })
  isFollowed: boolean;

  @Column({ type: 'text', nullable: true })
  reason: string;

  @CreateDateColumn()
  createdAt: Date;
}
