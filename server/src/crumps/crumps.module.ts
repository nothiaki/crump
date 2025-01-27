import { Module } from '@nestjs/common';
import { CrumpsService } from './crumps.service';
import { CrumpsController } from './crumps.controller';

@Module({
  controllers: [CrumpsController],
  providers: [CrumpsService],
})
export class CrumpsModule {}
