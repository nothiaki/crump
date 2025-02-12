import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrumpEntity } from './entities/crump.entity';
import { Repository } from 'typeorm';
import { CreateCrumpDto } from './dto/create-crump.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CrumpsService {
  constructor(
    @InjectRepository(CrumpEntity)
    private readonly crumpsRepository: Repository<CrumpEntity>,
    private readonly usersService: UsersService,
  ) {}

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    return this.crumpsRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async create(createCrumpDto: CreateCrumpDto) {
    const user = await this.usersService.findOneByName(createCrumpDto.from);

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
