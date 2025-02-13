import { Test, TestingModule } from '@nestjs/testing';
import { InController } from './in.controller';
import { InService } from './in.service';
import { CreateInDto } from './dto/create-in.dto';

describe('InController', () => {
  let inController: InController;
  let inService: InService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InController],
      providers: [
        {
          provide: InService,
          useValue: {
            in: jest.fn(),
          },
        },
      ],
    }).compile();

    inController = module.get<InController>(InController);
    inService = module.get<InService>(InService);
  });

  it('In', async () => {
    const createInDto: CreateInDto = {
      name: 'test',
      password: 'testTEST',
    };

    const res: any = {};

    await inController.create(createInDto, res);

    expect(inService.in).toHaveBeenCalledWith(createInDto, res);
  });
});
