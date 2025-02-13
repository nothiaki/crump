import { Body, Controller, Post, Res } from '@nestjs/common';
import { InService } from './in.service';
import { CreateInDto } from './dto/create-in.dto';
import { Response } from 'express';

@Controller('in')
export class InController {
  constructor(private readonly inService: InService) {}

  @Post()
  create(
    @Body() createInDto: CreateInDto,
    @Res() res: Response
  ) {
    return this.inService.in(createInDto, res);
  }
}
