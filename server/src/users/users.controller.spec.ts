import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({}),
            create: jest.fn().mockResolvedValue({}),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('findAll', async () => {
    await usersController.findAll();
    expect(usersService.findAll).toHaveBeenCalled();
  });

  it('findOne', async () => {
    const id: string = '3f351cda-1774-4e0f-9c71-fd4a0eb9ff07';

    await usersController.findOne(id);
    expect(usersService.findOne).toHaveBeenCalledWith(id);
  });

  it('create', async () => {
    const createUserDto: CreateUserDto = {
      name: 'test',
      email: 'test@test.test',
      password: 'testTEST',
    };

    await usersController.create(createUserDto);
    expect(usersService.create).toHaveBeenCalledWith(createUserDto);
  });

  it('remove', async () => {
    const id: string = '1fd09c9d-7e2a-4d14-bf4f-292db0a61c1e';

    await usersController.remove(id);
    expect(usersService.remove).toHaveBeenCalledWith(id);
  });
});
