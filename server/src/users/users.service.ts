import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  findOne(id: string) {
    return {
      id,
      email: 'jhon@mail.com',
      name: 'jhon',
      crumps: 301,
      createdAt: '2025-01-19 14:30:15.123456+00',
    };
  }
}
