import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

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

  async findOne(id: string) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException('user not exists', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async create(createUserDto: CreateUserDto) {
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
  }
}
