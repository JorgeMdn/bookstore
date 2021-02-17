import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('UserDetail')
export class UserDetail extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  pk_user_detail: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  last_name: string;

  @Column({ type: 'varchar', nullable: true })
  mother_last_name: string;

  @Column({ type: 'int', default: 1 })
  status: number;

  @Column({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @Column({ type: 'timestamp', name: 'created_by' })
  createdBy: Date;

  @Column({ type: 'timestamp', name: 'updated_by' })
  updatedBy: Date;
}
