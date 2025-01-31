import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(
    @Body() createAuthDto: CreateAuthDto,
    @Res() res: Response
  ) {
    return this.authService.in(createAuthDto, res);
  }
}
