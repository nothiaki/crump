import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

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
            create: jest.fn(),
            save: jest.fn(),
            preload: jest.fn(),
          },
        }
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
  });

  describe('Find all users', () => {
    it('should find all users', () => {
      expect(usersRepository.find).toHaveBeenCalled();
    });
  });

  describe('Find one user', () => {
    it('should find one user', () => {
      expect(usersRepository.findOneBy).toHaveBeenCalled();
    });
  });

  describe('Create user', () => {
    it('should create a user', () => {
      const createUserDto: CreateUserDto = {
        name: 'cooper',
        email: 'amet@icloud.edu',
        password: 'MLB79VUM6FJ',
      };

      expect(usersRepository.findOne).toHaveBeenCalledTimes(2);
      expect(usersRepository.create).toHaveBeenCalledWith(createUserDto);
      expect(usersRepository.save).toHaveBeenCalled();
    });
  });

  describe('Delete one user', () => {
    it('should delete one user', () => {
      expect(usersRepository.preload).toHaveBeenCalled();
      expect(usersRepository.save).toHaveBeenCalled();
    });
  });
});

