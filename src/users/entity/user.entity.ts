import {
  Entity,
  Column,
  //JoinColumn,
  //OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  BeforeInsert,
  //OneToMany,
  //ManyToOne,
} from 'typeorm';
import { UserEnum } from '../enums/user-type.enum';
import * as bcrypt from 'bcrypt';

@Entity('User')
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: true })
  isActive: boolean;

  @Column({ enum: UserEnum, type: 'enum' })
  userRole: UserEnum;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
