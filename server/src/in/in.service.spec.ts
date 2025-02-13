import { Test, TestingModule } from '@nestjs/testing';
import { UserEntity } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { HttpException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { InService } from './in.service';
import { HashServiceAbstract } from 'src/auth/hash/hash.service.abstract';
import { CreateInDto } from './dto/create-in.dto';

describe('InService', () => {
  let inService: InService;
  let usersService: UsersService;
  let jwtService: JwtService;
  let bcryptHashService: HashServiceAbstract;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InService,
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

    inService = module.get<InService>(InService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
    bcryptHashService = module.get<HashServiceAbstract>(HashServiceAbstract);
  });

  describe('Login user', () => {
    it('should login user', async () => {
      const createInDto: CreateInDto = {
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

      await inService.in(createInDto, res as Response);

      expect(usersService.findOneByName).toHaveBeenCalled();
      expect(jwtService.signAsync).toHaveBeenCalled();
      expect(res.cookie).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalled();
      expect(res.send).toHaveBeenCalled();
    });

    it('should return user or password are incorrects', async () => {
      const createInDto: CreateInDto = {
        name: 'test',
        password: 'testTEST',
      };

      const res: any  = {};

      jest.spyOn(usersService, 'findOneByName').mockResolvedValue(null);

      await expect(inService.in(createInDto, res as Response)).rejects.toThrow(HttpException);

      expect(usersService.findOneByName).toHaveBeenCalled();
    });

    it('should return password incorrect', async () => {
      const createInDto: CreateInDto = {
        name: 'test',
        password: 'testTEST',
      };

      const res: any  = {};

      jest.spyOn(bcryptHashService, 'compare').mockResolvedValue(false);

      await expect(inService.in(createInDto, res as Response))
        .rejects.toThrow(HttpException);
    });
  });
});
