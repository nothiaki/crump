import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrumpEntity } from './entities/crump.entity';
import { Repository } from 'typeorm';
import { CreateCrumpDto } from './dto/create-crump.dto';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class CrumpsService {
  constructor(
    @InjectRepository(CrumpEntity)
    private readonly crumpsRepository: Repository<CrumpEntity>,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  findAll() {
    return this.crumpsRepository.find();
  }

  async create(createCrumpDto: CreateCrumpDto) {
    const user = await this.usersRepository.findOneBy({
      name: createCrumpDto.from,
    });

    if (!user) {
      throw new HttpException('user not exists', HttpStatus.NOT_FOUND);
    }

    const newCrump = this.crumpsRepository.create({
      content: createCrumpDto.content,
      from: user,
    });

    return await this.crumpsRepository.save(newCrump);
  }

  async remove(id: number) {
    const crump = await this.crumpsRepository.findOneBy({ id });

    if (!crump) {
      throw new HttpException('crump not exists', HttpStatus.NOT_FOUND);
    }

    await this.crumpsRepository.remove(crump);
  }
}
