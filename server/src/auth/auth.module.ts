import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HashServiceAbstract } from './hash/hash.service.abstract';
import { BcryptHashService } from './hash/bcrypt-hash.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: HashServiceAbstract,
      useClass: BcryptHashService,
    },
  ],
})
export class AuthModule {}
