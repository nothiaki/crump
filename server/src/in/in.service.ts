import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateInDto } from './dto/create-in.dto';
import { Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { HashServiceAbstract } from 'src/auth/hash/hash.service.abstract';

@Injectable()
export class InService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly hashService: HashServiceAbstract,
  ) {}

  async in(createInDto: CreateInDto, res: Response) {
    const user = await this.usersService.findOneByName(createInDto.name);

    if (!user) {
      throw new HttpException(
        'user or password are incorrects',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isValidPassword = await this.hashService.compare(
      createInDto.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new HttpException(
        'user or password are incorrects',
        HttpStatus.BAD_REQUEST,
      );
    }

    const token = await this.jwtService.signAsync({
      sub: user.id,
      name: createInDto.name,
    });

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 1, //1 hour
      sameSite: 'strict',
    });

    return res.status(HttpStatus.OK).send();
  }
}
