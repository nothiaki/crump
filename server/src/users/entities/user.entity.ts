import { CrumpEntity } from 'src/crumps/entities/crump.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  name: string;

  @Column('integer', { default: 0 })
  totalCrumps: number;

  @Column()
  password: string;

  //@Column()
  //salt: string;

  //@Column()
  //role: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => CrumpEntity, (crump: CrumpEntity) => crump.id)
  crumps: CrumpEntity[];
}
