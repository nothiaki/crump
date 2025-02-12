import { Test, TestingModule } from "@nestjs/testing";
import * as bcrypt from 'bcrypt';
import { BcryptHashService } from "./bcrypt-hash.service";

jest.mock('bcrypt', () => ({
  compare: jest.fn().mockResolvedValue(true),
  hashSync: jest.fn().mockReturnValue('6a5b4c3d2e1'),
}));

describe('BcryptHashService', () => {
  let bcryptHashService: BcryptHashService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BcryptHashService],
    }).compile();

    bcryptHashService = module.get<BcryptHashService>(BcryptHashService);
  });

  it('compare return true', async () => {
    const password: string = '123456';
    const hash: string = 'uf723AS6bus7l';

    const isValidPassword = await bcryptHashService.compare(password, hash);

    expect(bcrypt.compare).toHaveBeenCalledWith(password, hash);
    expect(isValidPassword).toBe(true);
  });

  it('hash return password hashed', async () => {
    const password: string = '123456';

    const passwordHash = bcryptHashService.hash(password);

    expect(bcrypt.hashSync).toHaveBeenCalledWith(password, 12);
    expect(passwordHash).toBe('6a5b4c3d2e1');
  });
});
