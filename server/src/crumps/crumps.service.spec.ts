import { Test, TestingModule } from '@nestjs/testing';
import { CrumpsService } from './crumps.service';
import { CrumpEntity } from './entities/crump.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { CreateCrumpDto } from './dto/create-crump.dto';
import { HttpException } from '@nestjs/common';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UsersService } from 'src/users/users.service';

describe('CrumpsService', () => {
  let crumpsService: CrumpsService;
  let crumpsRepository: Repository<CrumpEntity>;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CrumpsService,
        {
          provide: getRepositoryToken(CrumpEntity),
          useValue: {
            find: jest.fn(),
            findOneBy: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: UsersService,
          useValue: {
            findOneByName: jest.fn(),
          },
        },
      ],
    }).compile();

    crumpsService = module.get<CrumpsService>(CrumpsService);
    crumpsRepository = module.get<Repository<CrumpEntity>>(
      getRepositoryToken(CrumpEntity),
    );
    usersService = module.get<UsersService>(UsersService);
  });

  describe('Find all crumps', () => {
    it('should find all crumps', async () => {
      const paginationDto: PaginationDto = {
        limit: 1,
        offset: 1,
      };

      await crumpsService.findAll(paginationDto);

      expect(crumpsRepository.find).toHaveBeenCalledWith({
        take: 1,
        skip: 1,
      });
    });
  });

  describe('Create one crump', () => {
    it('should create one crump', async () => {
      const createCrumpDto: CreateCrumpDto = {
        content: 'test',
        from: 'tester',
      };

      jest.spyOn(usersService, 'findOneByName').mockResolvedValue({
        id: '62899595-1fd2-480a-9963-bed113857a96',
        name: 'tester',
      } as UserEntity);

      await crumpsService.create(createCrumpDto);

      expect(usersService.findOneByName).toHaveBeenCalled();
      expect(crumpsRepository.create).toHaveBeenCalled();
      expect(crumpsRepository.save).toHaveBeenCalled();
    });

    it('should return not found user', async () => {
      const createCrumpDto: CreateCrumpDto = {
        content: 'test',
        from: 'tester',
      };

      jest.spyOn(usersService, 'findOneByName').mockResolvedValue(null);

      await expect(crumpsService.create(createCrumpDto)).rejects.toThrow(
        HttpException,
      );
      expect(usersService.findOneByName).toHaveBeenCalledWith(
        createCrumpDto.from,
      );
    });
  });

  describe('Delete one crump', () => {
    it('should delete one crump', async () => {
      const id: number = 1;

      const mockCrumpPartial = {
        id,
        content: 'test',
      };

      jest
        .spyOn(crumpsRepository, 'findOneBy')
        .mockResolvedValue(mockCrumpPartial as CrumpEntity);

      await crumpsService.remove(id);

      expect(crumpsRepository.findOneBy).toHaveBeenCalled();
      expect(crumpsRepository.remove).toHaveBeenCalled();
    });

    it('should return not found crump', async () => {
      const id: number = 0;

      jest.spyOn(crumpsRepository, 'findOneBy').mockResolvedValue(null);

      await expect(crumpsService.remove(id)).rejects.toThrow(HttpException);
      expect(crumpsRepository.findOneBy).toHaveBeenCalledWith({ id });
    });
  });
});
