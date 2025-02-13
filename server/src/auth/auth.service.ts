import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { HashServiceAbstract } from './hash/hash.service.abstract';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly bcryptHashService: HashServiceAbstract,
  ) {}

  async in(createAuthDto: CreateAuthDto, res: Response) {
    const user = await this.usersService.findOneByName(createAuthDto.name);

    if (!user) {
      throw new HttpException('user or password are incorrects', HttpStatus.BAD_REQUEST);
    }

    const isValidPassword = await this.bcryptHashService.compare(createAuthDto.password, user.password);

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
