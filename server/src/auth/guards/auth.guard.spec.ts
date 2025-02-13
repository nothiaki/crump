import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from './auth.guard';
import { ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthGuard,
        {
          provide: JwtService,
          useValue: {
            verifyAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    authGuard = module.get<AuthGuard>(AuthGuard);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should login the user', async () => {
    const token = 'randtoken';

    const context: any = {
      switchToHttp: jest.fn().mockReturnThis(),
      getRequest: jest.fn().mockReturnValue({
        cookies: { token },
      }),
    };

    jest.spyOn(authGuard, 'getTokenFromCookie').mockReturnValue(token);

    await authGuard.canActivate(context as ExecutionContext);

    expect(authGuard.getTokenFromCookie).toHaveBeenCalled();
    expect(jwtService.verifyAsync).toHaveBeenCalledWith(token);
  });


  it('should get the token from cookies', async () => {
    const token: string = 'randomtoken';

    const req: any = {
      cookies: { token },
    };

    const shouldBeAToken = authGuard.getTokenFromCookie(req as Request);

    expect(shouldBeAToken).toBe(token);
  });
});
