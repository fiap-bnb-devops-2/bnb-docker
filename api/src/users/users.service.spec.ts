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
        findUnique: (() => { }),
        update: (() => { }),
        delete: (() => { }),
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

  });

});
