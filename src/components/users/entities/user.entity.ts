import { Role } from '../../role/entities/role.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

//entities
import { UserDetail } from './user.detail.entity';

@Entity('User')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  pk_user: number;

  @Column({ type: 'varchar', nullable: false, unique: true })
  username: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @OneToOne((type) => UserDetail, {
    cascade: true,
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'fk_detail' })
  details: UserDetail;

  @ManyToMany((type) => Role, (role) => role.users, { eager: true })
  @JoinTable({ name: 'UserRole' })
  roles: Role[];

  @Column({ type: 'int', default: 1 })
  status: number;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @Column({ type: 'timestamp', name: 'created_by', nullable: true })
  createdBy: Date;

  @Column({ type: 'timestamp', name: 'updated_by', nullable: true })
  updatedBy: Date;
}
