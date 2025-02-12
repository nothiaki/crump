import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CrumpsService } from './crumps.service';
import { CreateCrumpDto } from './dto/create-crump.dto';
import { ResponseCrumpDto } from './dto/response-crump.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('crumps')
export class CrumpsController {
  constructor(private readonly crumpsService: CrumpsService) {}

  @UseInterceptors(CacheInterceptor)
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.crumpsService.findAll(paginationDto);
  }

  @Post()
  async create(@Body() createCrumpDto: CreateCrumpDto) {
    const crump = await this.crumpsService.create(createCrumpDto);
    return new ResponseCrumpDto(crump);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.crumpsService.remove(id);
  }
}
