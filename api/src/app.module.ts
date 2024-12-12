import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { UsersModule } from './users/users.module';
import { JestTestsModule } from './jest-tests/jest-tests.module';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';

@Module({
  imports: [UsersModule, JestTestsModule, RabbitmqModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
