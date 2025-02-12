import { Module } from '@nestjs/common';
import { CrumpsService } from './crumps.service';
import { CrumpsController } from './crumps.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [CrumpsController],
  providers: [CrumpsService],
})
export class CrumpsModule {}
