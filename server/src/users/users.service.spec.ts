import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { HttpException } from '@nestjs/common';

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            find: jest.fn(),
            findOneBy: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn().mockResolvedValue(UserEntity),
            save: jest.fn(),
            preload: jest.fn().mockResolvedValue(UserEntity),
          },
        }
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
  });
  
  describe('Find all users', () => {
    it('should find all users', async () => {
      await usersService.findAll();

      expect(usersRepository.find).toHaveBeenCalled();
    });
  });
  
  describe('Find one user', () => {
    it('should find one user', async () => {
      const id: string = 'cd674539-4a10-42af-b658-2da0a710dc8a';
      const mockUserPartial = {
        id,
        name: 'test',
        email: 'test@test.test',
      };

      jest.spyOn(usersRepository, 'findOneBy').mockResolvedValue(mockUserPartial as UserEntity);

      const response = await usersService.findOne(id);

      expect(usersRepository.findOneBy).toHaveBeenCalledWith({ id });
      expect(response).toBe(mockUserPartial);
    });

    it('should return not found user', async () => {
      const id: string = 'cd674539-4a10-42af-b658-2da0a710dc8a';

      jest.spyOn(usersRepository, 'findOneBy').mockResolvedValue(null);

      await expect(usersService.findOne(id)).rejects.toThrow(HttpException);
      expect(usersRepository.findOneBy).toHaveBeenCalledWith({ id });
    });
  });
  
  describe('Create user', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'test',
        email: 'test@test.test',
        password: 'testTEST',
      };

      await usersService.create(createUserDto);

      expect(usersRepository.findOne).toHaveBeenCalledTimes(2);
      expect(usersRepository.create).toHaveBeenCalledWith(createUserDto);
      expect(usersRepository.save).toHaveBeenCalled();
    });

    it('should return email already exist', async () => {
      const createUserDto: CreateUserDto = {
        name: 'test',
        email: 'test@test.test',
        password: 'testTEST',
      };

      jest.spyOn(usersRepository, 'findOne').mockResolvedValue({
        id: 'd813d58b-4b2d-4ce8-8d89-bb90acc1d6d7',
        email: 'test@test.test',
      } as UserEntity);

      await expect(usersService.create(createUserDto)).rejects.toThrow(HttpException);
      expect(usersRepository.findOne).toHaveBeenCalled();
    });

    it('should return name already exist', async () => {
      const createUserDto: CreateUserDto = {
        name: 'test',
        email: 'test@test.test',
        password: 'testTEST',
      };

      jest.spyOn(usersRepository, 'findOne')
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce({
        id: 'd813d58b-4b2d-4ce8-8d89-bb90acc1d6d7',
        name: 'test',
      } as UserEntity);

      await expect(usersService.create(createUserDto)).rejects.toThrow(HttpException);
      expect(usersRepository.findOne).toHaveBeenCalled();
    });
  });
  
  describe('Delete one user', () => {
    it('should delete one user', async () => {
      await usersService.remove('46421185-f2dc-45c9-af9e-cf98186fa486');

      expect(usersRepository.preload).toHaveBeenCalled();
      expect(usersRepository.save).toHaveBeenCalled();
    });

    it('should return not found user', async () => {
      const id: string = 'cd674539-4a10-42af-b658-2da0a710dc8a';

      jest.spyOn(usersRepository, 'preload').mockResolvedValue(null);

      await expect(usersService.remove(id)).rejects.toThrow(HttpException);
      expect(usersRepository.preload).toHaveBeenCalledWith({ id, isActive: false, });
    });
  });
});

