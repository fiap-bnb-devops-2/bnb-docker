import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma.service';

describe('UsersService', () => {

  let service: UsersService;
  let fakePrismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: fakePrismaService,
        },
      ],
    }).compile();

    fakePrismaService = {
      users: {
        findMany: (() => {
          console.log("Executando dentro do Prisma fake");
          return Promise.resolve([{
            id: 1,
            email: 'rafael@fiap.com.br',
            name: 'Rafael',
          }, {
            id: 2,
            email: 'joao@fiap.com.br',
            name: 'João',
          }]);
        }),
        findFirst: ((args) => {

          if (args.where.email === 'rafael@fiap.com.br') {
            return Promise.resolve({
              id: 2,
              name: 'Rafael',
              email: 'rafael@fiap.com.br',
            });
          }

          return Promise.resolve(null);

        }),
        create: (() => {
          return Promise.resolve({
            id: 1,
            name: 'Glaucio',
            email: 'glaucio@fiap.com.br',
            password: 'glaucio1234',
          });
        }),
        findUnique: ((args) => {

          if (args.where.id === 1) {
            return Promise.resolve({
              id: 1,
              name: 'Rafael',
              email: 'rafael@fiap.com.br',
              password: 'Rafael1234',
            });
          } else {
            return Promise.resolve(null);
          }

        }),
        update: ((args) => {

          return Promise.resolve({
            ...args.where,
            ...args.data,
          });

        }),
        delete: ((args) => {

          return Promise.resolve({
            ...args.where,
          });

        }),
      }
    } as unknown as PrismaService;

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('listUsers method', () => {

    it('should return a list of users', async () => {

      const users = await service.listUsers();

      expect(users.length).toBe(2);

    });

  });

  describe('create method', () => {

    it('should create a new user', async () => {

      const userName = 'Glaucio';
      const userEmail = 'glaucio@fiap.com.br';

      const user = await service.create(userName, userEmail, 'Glaucio1234');

      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('name', userName);
      expect(user).toHaveProperty('email', userEmail);

    });

    it('should return an error when trying to create an already existed user', async () => {

      try {

        await service.create('Rafael', 'rafael@fiap.com.br', 'rafael1234');

      } catch (error) {

        expect(error).toBeDefined();
        expect(error).toHaveProperty('response');
        expect(error.response).toHaveProperty('message', 'Já há um usuário com este email');
        expect(error.response).toHaveProperty('error', 'Bad Request');
        expect(error.response).toHaveProperty('statusCode', 400);

      }

    });

    it('should return an error if name is not provided', async () => {

      try {

        await service.create('', '', '');

      } catch (error) {

        expect(error).toBeDefined();
        expect(error).toHaveProperty('response');
        expect(error.response).toHaveProperty('message', 'Informe o nome do usuário');
        expect(error.response).toHaveProperty('error', 'Bad Request');
        expect(error.response).toHaveProperty('statusCode', 400);

      }

    });

    it('should return an error if email is not provided', async () => {

      try {

        await service.create('Rafael', '', '');

      } catch (error) {

        expect(error).toBeDefined();
        expect(error).toHaveProperty('response');
        expect(error.response).toHaveProperty('message', 'Informe o email do usuário');
        expect(error.response).toHaveProperty('error', 'Bad Request');
        expect(error.response).toHaveProperty('statusCode', 400);

      }

    });

    it('should return an error if password is not provided', async () => {

      try {

        await service.create('Rafael', 'rafael@fiap.com.br', '');

      } catch (error) {

        expect(error).toBeDefined();
        expect(error).toHaveProperty('response');
        expect(error.response).toHaveProperty('message', 'Informe a senha do usuário');
        expect(error.response).toHaveProperty('error', 'Bad Request');
        expect(error.response).toHaveProperty('statusCode', 400);

      }

    });

  });

  describe('get method', () => {

    it('should return an user', async () => {

      const user = await service.get(1);

      expect(user.id).toBeDefined();
      expect(user.name).toBeDefined();
      expect(user.email).toBeDefined();
      expect(user.password).toBeDefined();

    });

    it('should return an error if id is invalid', async () => {

      try {

        await service.get('ABC' as unknown as number);

      } catch (error) {

        expect(error).toBeDefined();
        expect(error).toHaveProperty('response');
        expect(error.response).toHaveProperty('message', 'ID inválido.');
        expect(error.response).toHaveProperty('error', 'Bad Request');
        expect(error.response).toHaveProperty('statusCode', 400);

      }

    });

    it('should return an error if user is not found', async () => {

      try {

        await service.get(5);

      } catch (error) {

        expect(error).toBeDefined();
        expect(error).toHaveProperty('response');
        expect(error.response).toHaveProperty('message', 'Usuário não encontrado.');
        expect(error.response).toHaveProperty('error', 'Not Found');
        expect(error.response).toHaveProperty('statusCode', 404);

      }

    });

  });

  describe('update method', () => {

    const name = 'Rafael Ribeiro';
    const email = 'rafaelribeiro@fiap.com.br';
    const password = 'Rafael123456';

    it('should update an user', async () => {

      const id = 1;

      const updatedUser = await service.update(id, {
        name: name,
        email: email,
        password: password,
      });

      expect(updatedUser).toHaveProperty('id', id);
      expect(updatedUser).toHaveProperty('name', name);
      expect(updatedUser).toHaveProperty('email', email);
      expect(updatedUser).toHaveProperty('password', password);

    });

    it('should return an error if id is invalid', async () => {

      try {

        await service.update('ABC' as unknown as number, {
          name: name,
          email: email,
          password: password,
        });

      } catch (error) {

        expect(error).toBeDefined();
        expect(error).toHaveProperty('response');
        expect(error.response).toHaveProperty('message', 'ID inválido.');
        expect(error.response).toHaveProperty('error', 'Bad Request');
        expect(error.response).toHaveProperty('statusCode', 400);

      }

    });

    it('should return an error if user is not found', async () => {

      try {

        await service.update(5, {
          name: name,
          email: email,
          password: password,
        });

      } catch (error) {

        expect(error).toBeDefined();
        expect(error).toHaveProperty('response');
        expect(error.response).toHaveProperty('message', 'Usuário não encontrado.');
        expect(error.response).toHaveProperty('error', 'Not Found');
        expect(error.response).toHaveProperty('statusCode', 404);

      }

    });

  });

  describe('remove method', () => {

    it('should remove an user', async () => {

      const removedUser = await service.remove(1);

      expect(removedUser).toBeDefined();
      expect(removedUser).toHaveProperty('id');

    });

    it('should return an error if id is invalid', async () => {

      try {

        await service.remove('ABC' as unknown as number);

      } catch (error) {

        expect(error).toBeDefined();
        expect(error).toHaveProperty('response');
        expect(error.response).toHaveProperty('message', 'ID inválido.');
        expect(error.response).toHaveProperty('error', 'Bad Request');
        expect(error.response).toHaveProperty('statusCode', 400);

      }

    });

    it('should return an error if user is not found', async () => {

      try {

        await service.remove(2);

      } catch (error) {

        expect(error).toBeDefined();
        expect(error).toHaveProperty('response');
        expect(error.response).toHaveProperty('message', 'Usuário não encontrado.');
        expect(error.response).toHaveProperty('error', 'Not Found');
        expect(error.response).toHaveProperty('statusCode', 404);

      }

    });

  });

});
