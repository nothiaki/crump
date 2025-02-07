import { Test, TestingModule } from '@nestjs/testing';
import { CrumpsController } from './crumps.controller';
import { CrumpsService } from './crumps.service';
import { CreateCrumpDto } from './dto/create-crump.dto';

describe('CrumpsController', () => {
  let crumpsController: CrumpsController;
  let crumpsService: CrumpsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CrumpsController],
      providers: [
        {
          provide: CrumpsService,
          useValue: {
            findAll: jest.fn(),
            create: jest.fn().mockResolvedValue({ from: {}, }),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    crumpsController = module.get<CrumpsController>(CrumpsController);
    crumpsService = module.get<CrumpsService>(CrumpsService);
  });

  it('findAll', async () => {
    await crumpsController.findAll();
    expect(crumpsService.findAll).toHaveBeenCalled();
  });

  it('create', async () => {
    const createCrumpDto: CreateCrumpDto = {
      from: 'test',
      content: 'random crump',
    };

    await crumpsController.create(createCrumpDto);
    expect(crumpsService.create).toHaveBeenCalledWith(createCrumpDto);
  });

  it('remove', async () => {
    const id: number = 0;

    await crumpsController.remove(id);
    expect(crumpsService.remove).toHaveBeenCalledWith(id);
  });

});
