import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { RedisCacheService } from '../redis-cache/redis-cache.service';

@Injectable()
export class UsersService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly redisService: RedisCacheService,
    ) { }

    async listUsers() {

        const usersCache = await this.redisService.getFromRedis('users-cache');

        if (usersCache) {
            return usersCache;
        }

        const users = await this.prisma.users.findMany();

        await this.redisService.saveRedis('users-cache', users, 30);

        return users;

    }

    async create(userName: string, userEmail: string, userPassword: string) {

        return new Promise((resolve) => {

            setTimeout(async () => {

                if (!userName) {
                    throw new BadRequestException('Informe o nome do usuário');
                }

                if (!userEmail) {
                    throw new BadRequestException('Informe o email do usuário');
                }

                if (!userPassword) {
                    throw new BadRequestException('Informe a senha do usuário');
                }

                const user = await this.prisma.users.findFirst({
                    where: {
                        email: userEmail,
                    },
                });

                if (user) {

                    throw new BadRequestException('Já há um usuário com este email');

                }

                const newUser = await this.prisma.users.create({
                    data: {
                        name: userName,
                        email: userEmail,
                        password: userPassword,
                    },
                });

                console.log("CRIANDO USUARIO");

                resolve(newUser);

            }, 5000);

        });

    }

    async get(id: number) {

        if (isNaN(id)) {
            throw new BadRequestException('ID inválido.');
        }

        const user = await this.prisma.users.findUnique({
            where: {
                id: id,
            },
        });

        if (!user) {
            throw new NotFoundException('Usuário não encontrado.');
        }

        return user;

    }

    async update(id: number, data: any) {

        await this.get(id);

        return this.prisma.users.update({
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
            },
            where: {
                id,
            },
        });

    }

    async remove(id: number) {

        await this.get(id);

        return this.prisma.users.delete({
            where: {
                id: id,
            },
        });

    }

}
