import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async in(createAuthDto: CreateAuthDto, res: Response) {
    const user = await this.usersRepository.findOneBy({
      name: createAuthDto.name
    });

    if (!user) {
      throw new HttpException('user or password are incorrects', HttpStatus.BAD_REQUEST);
    }

    const isValidPassword = await bcrypt.compare(createAuthDto.password, user.password);

    if (!isValidPassword) {
      throw new HttpException('user or password are incorrects', HttpStatus.BAD_REQUEST);
    }

    const token = await this.jwtService.signAsync({
      sub: user.id,
      name: createAuthDto.name
    });

    res.cookie('token', token,
      {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 8, //8 hours
        sameSite: 'strict',
      });
    
    return res.status(HttpStatus.OK).send();
  }
}
