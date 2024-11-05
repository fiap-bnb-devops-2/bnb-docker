import { Module } from '@nestjs/common';
import { JestTestsService } from './jest-tests.service';

@Module({
  providers: [JestTestsService]
})
export class JestTestsModule {}
