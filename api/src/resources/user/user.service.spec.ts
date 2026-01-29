import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

describe('UserService', () => {
  let service: UserService;

  // Mocking the TypeORM repository methods
  const mockUserRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    merge: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          // Tells Nest: "When UserService asks for Repository<User>, give it this mock"
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;
  let repo: Repository<User>;

  const mockUser = { id: 1, firstName: 'John', email: 'john@test.com' };

  const mockUserRepository = {
    create: jest.fn().mockReturnValue(mockUser),
    save: jest.fn().mockResolvedValue(mockUser),
    find: jest.fn().mockResolvedValue([mockUser]),
    findOneBy: jest.fn().mockResolvedValue(mockUser),
    merge: jest.fn().mockReturnValue(mockUser),
    remove: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('✅ Happy Path: should successfully create a user', async () => {
      const dto = { firstName: 'John', lastName: 'Doe', email: 'j@t.com', age: 30 };
      const result = await service.create(dto as any);
      
      expect(repo.create).toHaveBeenCalledWith(dto);
      expect(repo.save).toHaveBeenCalled();
      expect(result).toEqual(mockUser);
    });
  });

  describe('findOne', () => {
    it('✅ Happy Path: should return a user if found', async () => {
      const result = await service.findOne(1);
      expect(repo.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual(mockUser);
    });

    it('❌ Edge Case: should throw NotFoundException if user missing', async () => {
      jest.spyOn(repo, 'findOneBy').mockResolvedValueOnce(null);
      
      await expect(service.findOne(99)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('✅ Happy Path: should update and save the user', async () => {
      const updateDto = { firstName: 'Johnny' };
      const result = await service.update(1, updateDto as any);
      
      expect(repo.merge).toHaveBeenCalled();
      expect(repo.save).toHaveBeenCalled();
      expect(result).toEqual(mockUser);
    });

    it('❌ Edge Case: should fail update if user does not exist', async () => {
      jest.spyOn(repo, 'findOneBy').mockResolvedValueOnce(null);
      
      await expect(service.update(99, {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('✅ Happy Path: should delete the user', async () => {
      await service.remove(1);
      expect(repo.remove).toHaveBeenCalledWith(mockUser);
    });

    it('❌ Edge Case: should fail delete if user does not exist', async () => {
      jest.spyOn(repo, 'findOneBy').mockResolvedValueOnce(null);
      
      await expect(service.remove(99)).rejects.toThrow(NotFoundException);
    });
  });
});
