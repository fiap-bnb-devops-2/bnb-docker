import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {

  constructor(private readonly prisma: PrismaService) { }

  getHello(): string {
    return 'Página inicial da API';
  }

  listUsers() {
    return this.prisma.users.findMany();
  }

}
