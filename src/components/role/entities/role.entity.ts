import { User } from '../../users/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Role')
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  pk_role: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @ManyToMany((type) => User, (user) => user.roles)
  @JoinColumn()
  users: User[];

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
