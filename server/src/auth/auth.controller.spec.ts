import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            in: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('In', async () => {
    const createAuthDto: CreateAuthDto = {
      name: 'test',
      password: 'testTEST',
    };

    const res: any = {};

    await authController.create(createAuthDto, res);

    expect(authService.in).toHaveBeenCalledWith(createAuthDto, res);
  });
});
