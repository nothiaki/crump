import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrumpEntity } from './entities/crump.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CrumpsService {
  constructor(
    @InjectRepository(CrumpEntity)
    private readonly crumpsRepository: Repository<CrumpEntity>,
  ) {}

  findAll() {
    return this.crumpsRepository.find();     
  }
}
