import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { UsersModule } from './users/users.module';
import { JestTestsModule } from './jest-tests/jest-tests.module';

@Module({
  imports: [UsersModule, JestTestsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
