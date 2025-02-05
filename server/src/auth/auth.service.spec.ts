import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let authService: AuthService;
  let usersRepository: Repository<UserEntity>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOneBy: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
    jwtService = module.get<JwtService>(JwtService);
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

      jest.spyOn(usersRepository, 'findOneBy').mockResolvedValue(mockUserPartial as UserEntity);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

      await authService.in(createAuthDto, res as Response);

      expect(usersRepository.findOneBy).toHaveBeenCalled();
      expect(jwtService.signAsync).toHaveBeenCalled();
      expect(res.cookie).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalled();
      expect(res.send).toHaveBeenCalled();
    });
  });
});
