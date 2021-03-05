import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('UserDetail')
export class UserDetail extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  pk_user_detail: number;

  @Column({ type: 'varchar', nullable: true })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  last_name: string;

  @Column({ type: 'varchar', nullable: true })
  mother_last_name: string;

  @Column({ type: 'int', default: 1 })
  status: number;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
  updatedAt: Date;

  @Column({ type: 'timestamp', name: 'updated_by', nullable: true })
  updatedBy: Date;
}
