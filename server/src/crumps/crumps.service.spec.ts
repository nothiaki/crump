import { Test, TestingModule } from '@nestjs/testing';
import { CrumpsService } from './crumps.service';

describe('CrumpsService', () => {
  let service: CrumpsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CrumpsService],
    }).compile();

    service = module.get<CrumpsService>(CrumpsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
