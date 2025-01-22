import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RequestUserDto } from './dto/request-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

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
    return this.usersRepository.findOneBy({ id });
  }

  async create(createUserDto: RequestUserDto) {
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
    }

    const newUser = this.usersRepository.create(createUserDto);
    newUser.salt = 'testYet';

    return await this.usersRepository.save(newUser);
  }
}
