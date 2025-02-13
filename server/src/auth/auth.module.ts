import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HashServiceAbstract } from './hash/hash.service.abstract';
import { BcryptHashService } from './hash/bcrypt-hash.service';

@Global()
@Module({
  providers: [
    AuthService,
    {
      provide: HashServiceAbstract,
      useClass: BcryptHashService,
    },
  ],
  exports: [HashServiceAbstract],
})
export class AuthModule {}
