import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { QueryIdUserDto } from './dto/query-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  find() {
    try {
      return this.usersRepository.find({
        where: {
          isActive: true,
        },
      });     
    } catch (error) {
      throw new Error(error);
    }
  }

  findOne(queryIdUserDto: QueryIdUserDto) {
    try {
      return this.usersRepository.findOneBy({ id: queryIdUserDto.id });
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const existingEmail = await this.usersRepository.findOne({
        where: {
          email: createUserDto.email,
        },
      });

      if (existingEmail) {
        throw new HttpException('email already exists', HttpStatus.CONFLICT);
      }

      const existingName = await this.usersRepository.findOne({
        where: {
          name: createUserDto.name,
        },
      });
      //i should transform this two queris in one

      if (existingName) {
        throw new HttpException('name already exists', HttpStatus.CONFLICT);
      }

      const newUser = this.usersRepository.create(createUserDto);

      newUser.password = await bcrypt.hashSync(createUserDto.password, 12);

      return await this.usersRepository.save(newUser);
    } catch (error) {
      throw new Error(error);
    }
  }
}
