import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column('integer', { default: 0 })
  crumps: number;

  @Column()
  password: string;

  @Column()
  salt: string;

  //@Column()
  //role: string;

  @CreateDateColumn()
  createdAt: string;

  @Column({ default: true })
  isActive: boolean;
}
