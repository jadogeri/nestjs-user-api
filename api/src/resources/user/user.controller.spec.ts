import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe, NotFoundException } from '@nestjs/common';
import request from 'supertest';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  // Mock data and service
  const mockUser = { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@test.com', age: 30 };
  
  const mockUserService = {
    create: jest.fn().mockResolvedValue(mockUser),
    findAll: jest.fn().mockResolvedValue([mockUser]),
    findOne: jest.fn().mockResolvedValue(mockUser),
    update: jest.fn().mockResolvedValue({ ...mockUser, firstName: 'Johnny' }),
    remove: jest.fn().mockResolvedValue(undefined),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compile();

    app = moduleFixture.createNestApplication();
    
    // Crucial: Must include global pipes/interceptors used in real app
    app.useGlobalPipes(new ValidationPipe()); 
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /users', () => {
    it('✅ Happy Path: should create a user and return 201', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({ firstName: 'John', lastName: 'Doe', email: 'john@test.com', age: 30 })
        .expect(201)
        .expect((res) => {
          expect(res.body.firstName).toEqual(mockUser.firstName);
          expect(res.body).toHaveProperty('id');
        });
    });

    it('❌ Edge Case: should return 400 for invalid email', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({ firstName: 'John', email: 'not-an-email' })
        .expect(400);
    });
  });

  describe('GET /users/:id', () => {
    it('✅ Happy Path: should return a user by ID', () => {
      return request(app.getHttpServer())
        .get('/users/1')
        .expect(200)
        .expect(res => {
          expect(res.body.id).toEqual(1);
        });
    });

    it('❌ Edge Case: should return 404 if user not found', () => {
      mockUserService.findOne.mockRejectedValueOnce(new NotFoundException());
      return request(app.getHttpServer())
        .get('/users/999')
        .expect(404);
    });

    it('❌ Edge Case: should return 400 if ID is not a number', () => {
      return request(app.getHttpServer())
        .get('/users/abc')
        .expect(400); // Triggered by ParseIntPipe
    });
  });

  describe('PATCH /users/:id', () => {
    it('✅ Happy Path: should update user', () => {
      return request(app.getHttpServer())
        .patch('/users/1')
        .send({ firstName: 'Johnny' })
        .expect(200)
        .expect(res => {
          expect(res.body.firstName).toEqual('Johnny');
        });
    });
  });

  describe('DELETE /users/:id', () => {
    it('✅ Happy Path: should delete user', () => {
      return request(app.getHttpServer())
        .delete('/users/1')
        .expect(200);
    });
  });
});
