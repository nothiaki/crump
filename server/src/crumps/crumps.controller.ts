import { Body, Controller, Get, Post } from '@nestjs/common';
import { CrumpsService } from './crumps.service';
import { CreateCrumpDto } from './dto/create-crump.dto';
import { ResponseCrumpDto } from './dto/response-crump.dto';

@Controller('crumps')
export class CrumpsController {
  constructor(private readonly crumpsService: CrumpsService) {}

  @Get()
  findAll() {
    return this.crumpsService.findAll();
  }

  @Post()
  async create(@Body() createCrumpDto: CreateCrumpDto) {
    const crump = await this.crumpsService.create(createCrumpDto);
    return new ResponseCrumpDto(crump);
  }
}
