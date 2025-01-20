import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RequestUserDto } from './dto/request-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>
  ) {}

  findOne(id: string) {
    return {
      id,
      email: 'jhon@mail.com',
      name: 'jhon',
      crumps: 301,
      createdAt: '2025-01-19 14:30:15.123456+00',
    };
  }

  async create(createUserDto: RequestUserDto) {
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });

    if(existingUser) {
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
    };

    const newUser = this.usersRepository.create(createUserDto);
    newUser.salt = "testYet";

    return await this.usersRepository.save(newUser);
  }
}
