import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { HashServiceAbstract } from './hash.service.abstract';

@Injectable()
export class BcryptHashService extends HashServiceAbstract {
  async compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  hash(password: string): string {
    return bcrypt.hashSync(password, 12);
  }
}
