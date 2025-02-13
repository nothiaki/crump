import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const token = this.getTokenFromCookie(req);

    if (!token) {
      throw new HttpException('You must be logged in to access this route', HttpStatus.UNAUTHORIZED);
    }

    try {
      await this.jwtService.verifyAsync(token);

      return true;

    } catch (error) {
      throw new HttpException('You must be logged in to access this route', HttpStatus.UNAUTHORIZED);
    }
  }

  getTokenFromCookie(req: Request): string | undefined {
    const token = req.cookies?.token;

    if (!token || typeof token !== 'string') {
      return;
    }

    return token;
  }
}
