import { Body, Controller, Get, Post } from '@nestjs/common';
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

}
