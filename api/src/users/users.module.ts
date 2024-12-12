import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma.service';
import { RabbitmqService } from 'src/rabbitmq/rabbitmq.service';

@Module({
    controllers: [UsersController],
    providers: [
        UsersService,
        PrismaService,
        RabbitmqService,
    ],
})
export class UsersModule {

    constructor(
        private readonly usersService: UsersService,
        private readonly rabbitmqService: RabbitmqService,
    ) {

        this.useRabbitmq();

    }

    async useRabbitmq() {

        await this.rabbitmqService.consumeQueue('create-user', (message) => {

            console.log("CONSUMINDO A FILA EM OUTRO ARQUIVO");

            const data = JSON.parse(String(message.content));

            return this.usersService.create(data.name, data.email, data.password);

        });

    }

}
