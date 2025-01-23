import { UserEntity } from '../entities/user.entity';

export class ResponseUserDto {
  id: string;
  email: string;
  name: string;
  crumps: number;
  createdAt: Date;

  constructor(user: Partial<UserEntity>) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.crumps = user.crumps;
    this.createdAt = user.createdAt;
  }
}
