import { Test, TestingModule } from '@nestjs/testing';
import { CrumpsService } from './crumps.service';
import { CrumpEntity } from './entities/crump.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { CreateCrumpDto } from './dto/create-crump.dto';
import { HttpException } from '@nestjs/common';

describe('CrumpsService', () => {
  let crumpsService: CrumpsService;
  let crumpsRepository: Repository<CrumpEntity>;
  let usersRepository: Repository<UserEntity>;

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
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOneBy: jest.fn(),
          },
        },
      ],
    }).compile();

    crumpsService = module.get<CrumpsService>(CrumpsService);
    crumpsRepository = module.get<Repository<CrumpEntity>>(getRepositoryToken(CrumpEntity));
    usersRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
  });

  describe('Find all crumps', () => {
    it('should find all crumps', async () => {
      await crumpsService.findAll();

      expect(crumpsRepository.find).toHaveBeenCalled();
    });
  });

  describe('Create one crump', () => {
    it('should create one crump', async () => {
      const createCrumpDto: CreateCrumpDto = {
        content: 'test',
        from: 'tester',
      };

      jest.spyOn(usersRepository, 'findOneBy').mockResolvedValue({
        id: '62899595-1fd2-480a-9963-bed113857a96',
        name: 'tester'
      } as UserEntity);

      await crumpsService.create(createCrumpDto);

      expect(usersRepository.findOneBy).toHaveBeenCalled();
      expect(crumpsRepository.create).toHaveBeenCalled();
      expect(crumpsRepository.save).toHaveBeenCalled();
    });

    it('should return not found user', async () => {
      const createCrumpDto: CreateCrumpDto = {
        content: 'test',
        from: 'tester',
      };

      jest.spyOn(usersRepository, 'findOneBy').mockResolvedValue(null);

      await expect(crumpsService.create(createCrumpDto)).rejects.toThrow(HttpException);
      expect(usersRepository.findOneBy).toHaveBeenCalledWith({
        name: createCrumpDto.from,
      });
    });
  });

  describe('Delete one crump', () => {
    it('should delete one crump', async () => {
      const id: number = 1;

      const mockCrumpPartial = {
        id,
        content: 'test',
      };

      jest.spyOn(crumpsRepository, 'findOneBy').mockResolvedValue(mockCrumpPartial as CrumpEntity);

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
