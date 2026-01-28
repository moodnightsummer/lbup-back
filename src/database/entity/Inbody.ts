import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';

export enum InbodySource {
  OCR = 'ocr',
  MANUAL = 'manual',
}

@Entity('inbodies')
export class Inbody {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.inbodies, {
    onDelete: 'CASCADE',
  })
  user: User;

  @Column('float')
  weight: number;

  @Column('float', { nullable: true })
  skeletalMuscleMass: number;

  @Column('float', { nullable: true })
  bodyFatMass: number;

  @Column('float', { nullable: true })
  bodyFatPercentage: number;

  @Column('float', { nullable: true })
  bmi: number;

  @Column('int', { nullable: true })
  basalMetabolicRate: number;

  @Column('int', { nullable: true })
  visceralFatLevel: number;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({
    type: 'enum',
    enum: InbodySource,
    default: InbodySource.OCR,
  })
  source: InbodySource;

  @Column({ type: 'date' })
  measuredAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
