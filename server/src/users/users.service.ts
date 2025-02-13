import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { HashServiceAbstract } from 'src/auth/hash/hash.service.abstract';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly hashService: HashServiceAbstract,
  ) {}

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    return this.usersRepository.find({
      where: {
        isActive: true,
      },
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException('user not exists', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async findOneByName(name: string) {
    const user = await this.usersRepository.findOneBy({ name });

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
    //i should transform this two querys in one

    if (existingName) {
      throw new HttpException('name already exists', HttpStatus.CONFLICT);
    }

    const newUser = this.usersRepository.create(createUserDto);

    newUser.password = this.hashService.hash(createUserDto.password);

    return this.usersRepository.save(newUser);
  }

  async remove(id: string) {
    const user = await this.usersRepository.preload({
      id,
      isActive: false,
    });

    if (!user) {
      throw new HttpException('user not exists', HttpStatus.NOT_FOUND);
    }

    await this.usersRepository.save(user);
  }
}
