import { UserEntity } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class CrumpEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.name)
  from: UserEntity;

  @Column()
  content: string;

  @Column()
  uncrumps: number;

  @CreateDateColumn()
  createdAt: Date;
}
