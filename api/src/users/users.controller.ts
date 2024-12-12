import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';

@Controller('users')
export class UsersController {

    constructor(
        private readonly usersService: UsersService,
        private readonly rabbitmqService: RabbitmqService,
    ) { }

    @Get()
    getUsers() {
        return this.usersService.listUsers();
    }

    @Post()
    createUser(
        @Body() body,
    ) {
        return this.usersService.create(body.name, body.email, body.password);
    }

    @Post('many')
    async createManyUsers(
        @Body() bodyArray,
    ) {

        await Promise.all(bodyArray.map(async (data) => {

            await this.rabbitmqService.publishInQueue('create-user', JSON.stringify(data));
            // return this.usersService.create(data.name, data.email, data.password);

        }));

    }

    @Put(':id')
    updateUser(
        @Param('id') id: string,
        @Body() body,
    ) {

        return this.usersService.update(Number(id), body);

    }

    @Delete(':id')
    removeUser(
        @Param('id') id: string,
    ) {

        return this.usersService.remove(Number(id));

    }

}
