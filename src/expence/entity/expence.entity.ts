import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entity/user.entity';

@Entity('Expence')
export class ExpenceEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  amount: number;

  @Column()
  reason: string;

  @Column()
  date: Date;

  @Column({ default: 'pending for approval' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  createdByUserId: string;

  @Column({ nullable: true })
  updatedByUserId: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'updatedByUserId' })
  updatedByUser: UserEntity;

  // @ManyToOne(() => UserEntity)
  // @JoinColumn({ name: 'deletedByUserId' })
  // deletedByUser: UserEntity;
  // nullable: true;
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'createdByUserId' })
  createdByUser: UserEntity;
}
