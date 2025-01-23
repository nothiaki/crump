import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RequestUserDto } from './dto/request-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { IsUUID } from 'class-validator';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  find() {
    return this.usersRepository.find({
      where: {
        isActive: true,
      },
    });
  }

  findOne(id: string) {
    try {
      return this.usersRepository.findOneBy({ id });
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(createUserDto: RequestUserDto) {
    try {
      const existingEmail = await this.usersRepository.findOne({
        where: {
          email: createUserDto.email,
        },
      });

      if (existingEmail) {
        throw new HttpException('email already exists', HttpStatus.BAD_REQUEST);
      }

      const existingName = await this.usersRepository.findOne({
        where: {
          name: createUserDto.name,
        },
      });
      //i should transform this two queris in one

      if (existingName) {
        throw new HttpException('name already exists', HttpStatus.BAD_REQUEST);
      }

      const newUser = this.usersRepository.create(createUserDto);
      newUser.salt = 'testYet';

      return await this.usersRepository.save(newUser);
    } catch (error) {
      throw new Error(error);
    }
  }
}
