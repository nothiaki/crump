import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Response } from 'express';
import { HttpException } from '@nestjs/common';
import { HashServiceAbstract } from './hash/hash.service.abstract';
import { UsersService } from 'src/users/users.service';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;
  let bcryptHashService: HashServiceAbstract;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOneByName: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
        {
          provide: HashServiceAbstract,
          useValue: {
            compare: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
    bcryptHashService = module.get<HashServiceAbstract>(HashServiceAbstract);
  });

  describe('Login user', () => {
    it('should login user', async () => {
      const createAuthDto: CreateAuthDto = {
        name: 'test',
        password: 'testTEST',
      };

      const res: any  = {
        cookie: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      
      const mockUserPartial = {
        id: '389707ad-3526-4617-a1d6-83bc559a2066',
        name: 'test',
        password: 'testTEST',
      };

      jest.spyOn(usersService, 'findOneByName').mockResolvedValue(mockUserPartial as UserEntity);
      jest.spyOn(bcryptHashService, 'compare').mockResolvedValue(true);

      await authService.in(createAuthDto, res as Response);

      expect(usersService.findOneByName).toHaveBeenCalled();
      expect(jwtService.signAsync).toHaveBeenCalled();
      expect(res.cookie).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalled();
      expect(res.send).toHaveBeenCalled();
    });

    it('should return user or password are incorrects', async () => {
      const createUserDto: CreateAuthDto = {
        name: 'test',
        password: 'testTEST',
      };

      const res: any  = {};

      jest.spyOn(usersService, 'findOneByName').mockResolvedValue(null);

      await expect(authService.in(createUserDto, res as Response)).rejects.toThrow(HttpException);

      expect(usersService.findOneByName).toHaveBeenCalled();
    });

    it('should return password incorrect', async () => {
      const createAuthDto: CreateAuthDto = {
        name: 'test',
        password: 'testTEST',
      };

      const res: any  = {};

      jest.spyOn(bcryptHashService, 'compare').mockResolvedValue(false);

      await expect(authService.in(createAuthDto, res as Response))
        .rejects.toThrow(HttpException);
    });
  });
});
