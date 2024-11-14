import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma.service';

function generateRandomNumber() {

  return Math.floor(Math.random() * 100);

}

describe('UsersController', () => {

  let controller: UsersController;
  let fakeUsersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
        PrismaService,
      ],
    }).compile();

    fakeUsersService = {
      listUsers: (() => {
        return Promise.resolve([{
          id: 1,
          name: 'Rafael',
          email: 'rafael@fiap.com.br',
        }, {
          id: 2,
          name: 'João',
          email: 'joao@fiap.com.br',
        }]);
      }),
      create: ((userName: string, userEmail: string, userPassword: string) => {
        return Promise.resolve({
          id: Math.floor(Math.random() * 100),
          name: userName,
          email: userEmail,
          password: userPassword,
        });
      }),
      update: ((userId: number, data) => {
        return Promise.resolve({
          id: userId,
          ...data,
        });
      }),
      remove: ((id: number) => {
        return Promise.resolve({
          id: id,
        });
      }),
    } as unknown as UsersService;

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUsers method', () => {

    it('should return a list of users', async () => {

      const users = await controller.getUsers();

      // expect(users.length).toBe(2);
      expect(users).toHaveLength(2);

    });

  });

  describe('createUser method', () => {

    it('should create an user', async () => {

      const userName = 'Rafael Ribeiro';
      const userEmail = 'rafael@fiap.com.br';
      const userPassword = 'Rafael1234';

      const newUser = await controller.createUser({
        name: userName,
        email: userEmail,
        password: userPassword,
      });

      console.log({
        newUser,
      });

      expect(newUser).toHaveProperty('id');
      expect(newUser).toHaveProperty('name');
      expect(newUser).toHaveProperty('email');

    });

  });

  describe('updateUser method', () => {

    it('should update an user', async () => {

      const userId = generateRandomNumber();
      const updatedName = 'Rafa Ribeiro';
      const updatedEmail = 'rafael@bnb.gov.br';

      const updatedUser = await controller.updateUser(String(userId), {
        name: updatedName,
        email: updatedEmail,
      });

      expect(updatedUser).toHaveProperty('id', userId);
      expect(updatedUser).toHaveProperty('name', updatedName);
      expect(updatedUser).toHaveProperty('email', updatedEmail);

    });

  });

  describe('removeUser method', () => {

    it('should remove an user', async () => {

      const userId = generateRandomNumber();

      const userToRemove = await controller.removeUser(String(userId));

      expect(userToRemove).toBeDefined();
      expect(userToRemove).toHaveProperty('id', userId);

    });

  });

});
