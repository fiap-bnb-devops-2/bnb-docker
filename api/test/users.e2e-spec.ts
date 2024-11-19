import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { execSync } from 'child_process';

describe('UsersController (e2e)', () => {

    let app: INestApplication;
    const databaseTestUrl = process.env.DATABASE_TEST_URL;

    beforeAll(() => {

        process.env = Object.assign(process.env, {
            DATABASE_URL: databaseTestUrl,
        });

        execSync('npx prisma db push --force-reset', {
            env: {
                ...process.env,
                DATABASE_URL: databaseTestUrl,
            },
        });

    });

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    describe('POST routes', () => {

        const name = 'Rafael';
        const email = 'rafael@fiap.com.br';
        const password = 'Rafael1234';

        it('/users (POST)', () => {

            return request(app.getHttpServer())
                .post('/users')
                .send({
                    name: name,
                    email: email,
                    password: password,
                })
                .expect(201)
                .then((response) => {

                    expect(response).toHaveProperty('text');

                    const newUser = JSON.parse(response.text);

                    expect(newUser).toHaveProperty('name', name);
                    expect(newUser).toHaveProperty('email', email);

                });

        });

        it('/users (POST) should return an error if name is not provided', () => {

            return request(app.getHttpServer())
                .post('/users')
                .send({})
                .expect(400)
                .then((response) => {

                    expect(response).toHaveProperty('text');

                    const res = JSON.parse(response.text);

                    expect(res).toHaveProperty('message', 'Informe o nome do usuário');

                });

        });

        it('/users (POST) should return an error if email is not provided', () => {

            return request(app.getHttpServer())
                .post('/users')
                .send({
                    name: name,
                })
                .expect(400)
                .then((response) => {

                    expect(response).toHaveProperty('text');

                    const res = JSON.parse(response.text);

                    expect(res).toHaveProperty('message', 'Informe o email do usuário');

                });

        });

        it('/users (POST) should return an error if password is not provided', () => {

            return request(app.getHttpServer())
                .post('/users')
                .send({
                    name: name,
                    email: email,
                })
                .expect(400)
                .then((response) => {

                    expect(response).toHaveProperty('text');

                    const res = JSON.parse(response.text);

                    expect(res).toHaveProperty('message', 'Informe a senha do usuário');

                });

        });

        it('/users (POST) should verify an existed user', () => {

            return request(app.getHttpServer())
                .post('/users')
                .send({
                    name,
                    email,
                    password,
                })
                .expect(400)
                .then((response) => {

                    expect(response).toHaveProperty('text');

                    const res = JSON.parse(response.text);

                    expect(res).toHaveProperty('message', 'Já há um usuário com este email');

                });

        });

    });

    describe('GET routes', () => {

        it('/users (GET)', () => {

            return request(app.getHttpServer())
                .get('/users')
                .expect(200)
                .then((response) => {

                    expect(response).toHaveProperty('text');

                    const users = JSON.parse(response.text);

                    expect(users).toHaveLength(1);

                });

        }, 10000);

    });

    describe('PUT routes', () => {

        const updatedName = 'Rafael atualizado';

        it('/users/1 (PUT)', () => {

            return request(app.getHttpServer())
                .put('/users/1')
                .send({
                    name: updatedName,
                })
                .expect(200)
                .then((response) => {

                    expect(response).toHaveProperty('text');

                    const res = JSON.parse(response.text);

                    expect(res).toHaveProperty('name', updatedName);

                });

        });

        it('/users/2 (PUT)', () => {

            return request(app.getHttpServer())
                .put('/users/2')
                .send({
                    name: updatedName,
                })
                .expect(404)
                .then((response) => {

                    expect(response).toHaveProperty('text');

                    const res = JSON.parse(response.text);

                    expect(res).toHaveProperty('message', 'Usuário não encontrado.');

                });

        });

        it('/users/abcd (PUT)', () => {

            return request(app.getHttpServer())
                .put('/users/abcd')
                .send({
                    name: updatedName,
                })
                .expect(400)
                .then((response) => {

                    expect(response).toHaveProperty('text');

                    const res = JSON.parse(response.text);

                    expect(res).toHaveProperty('message', 'ID inválido.');

                });

        });

    });

    afterAll(() => {

        // execSync('npx prisma db push --force-reset', {
        //     env: {
        //         ...process.env,
        //         DATABASE_URL: databaseTestUrl,
        //     },
        // });

    });

});
