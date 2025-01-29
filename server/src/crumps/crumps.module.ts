import { Module } from '@nestjs/common';
import { CrumpsService } from './crumps.service';
import { CrumpsController } from './crumps.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrumpEntity } from './entities/crump.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CrumpEntity])],
  controllers: [CrumpsController],
  providers: [CrumpsService],
})
export class CrumpsModule {}
