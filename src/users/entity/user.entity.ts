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

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
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
  @BeforeInsert()
  async toLowerCase() {
    this.username = this.username.toLowerCase();
  }
  async checkPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  // async encryption() {
  //   return (this.id = encryptId(this.id));
  // }
  // @OneToMany(
  //   () => UserRoleMappingEntity,
  //   (userRoleMapping) => userRoleMapping.user,
  // )
  // userRoleMappings: UserRoleMappingEntity[];
}
