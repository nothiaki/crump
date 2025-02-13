import { Module } from '@nestjs/common';
import { InService } from './in.service';
import { InController } from './in.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [InController],
  providers: [InService],
})
export class InModule {}
