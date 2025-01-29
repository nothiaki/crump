import { UserEntity } from '../entities/user.entity';

export class ResponseUserDto {
  id: string;
  email: string;
  name: string;
  totalCrumps: number;
  createdAt: Date;

  constructor(user: Partial<UserEntity>) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.totalCrumps = user.totalCrumps;
    this.createdAt = user.createdAt;
  }
}
