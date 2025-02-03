import { Test, TestingModule } from '@nestjs/testing';
import { CrumpsService } from './crumps.service';
import { CrumpEntity } from './entities/crump.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateCrumpDto } from './dto/create-crump.dto';

describe('CrumpsService', () => {
  let crumpsService: CrumpsService;
  let crumpsRepository: Repository<CrumpEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CrumpsService,
        {
          provide: getRepositoryToken(CrumpEntity),
          useValue: {
            find: jest.fn(),
            findOneBy: jest.fn(),
            remove: jest.fn(),
          },
        }
      ],
    }).compile();

    crumpsService = module.get<CrumpsService>(CrumpsService);
    crumpsRepository = module.get<Repository<CrumpEntity>>(getRepositoryToken(CrumpEntity));
  });

  describe('Find all crumps', () => {
    it('should find all crumps', () => {
      expect(crumpsRepository.find).toHaveBeenCalled();
    });
  });

  describe('Delete one crump', () => {
    it('should delete one crump', () => {
      expect(crumpsRepository.findOneBy).toHaveBeenCalled();
      expect(crumpsRepository.remove).toHaveBeenCalled();
    });
  });
});
