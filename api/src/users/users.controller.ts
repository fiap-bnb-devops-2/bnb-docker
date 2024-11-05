import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

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
