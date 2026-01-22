import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nickname: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true })
  providerId: string;

  @Column()
  provider: 'google' | 'apple';

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
