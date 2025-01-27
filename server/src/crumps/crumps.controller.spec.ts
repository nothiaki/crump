import { Test, TestingModule } from '@nestjs/testing';
import { CrumpsController } from './crumps.controller';
import { CrumpsService } from './crumps.service';

describe('CrumpsController', () => {
  let controller: CrumpsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CrumpsController],
      providers: [CrumpsService],
    }).compile();

    controller = module.get<CrumpsController>(CrumpsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
