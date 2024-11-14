import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('UsersController (e2e)', () => {

    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    describe('GET routes', () => {

        it('/users (GET)', () => {

            return request(app.getHttpServer())
                .get('/users')
                .expect(200)
                .then((response) => {

                    expect(response).toHaveProperty('text');

                    const users = JSON.parse(response.text);

                    expect(users).toHaveLength(10);

                });

        }, 10000);

    });

    describe('POST routes', () => {

        it('/users (POST)', () => {

            const name = 'Rafael';
            const email = 'rafael@fiap.com.br';
            const password = 'Rafael1234';

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

    });

});
