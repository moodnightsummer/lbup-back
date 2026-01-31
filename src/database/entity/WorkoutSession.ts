import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { User } from './User';
import { WorkoutSet } from './WorkoutSet';

@Entity('workout_sessions')
@Index(['user', 'workoutDate'], { unique: true })
export class WorkoutSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.workoutSession, {
    onDelete: 'CASCADE',
  })
  user: User;

  @Column({ type: 'date' })
  workoutDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  startedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  endedAt: Date;

  @Column({ type: 'float', nullable: true })
  totalVolume: number;

  @Column({ type: 'text', nullable: true })
  memo: string;

  @OneToMany(() => WorkoutSet, (set) => set.session)
  sets: WorkoutSet[];

  @CreateDateColumn()
  createdAt: Date;
}
