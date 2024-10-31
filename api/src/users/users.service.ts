import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {

    constructor(private readonly prisma: PrismaService) { }

    listUsers() {
        return this.prisma.users.findMany();
    }

    create(userName: string, userEmail: string, userPassword: string) {

        return this.prisma.users.create({
            data: {
                name: userName,
                email: userEmail,
                password: userPassword,
            },
        });

    }

}
