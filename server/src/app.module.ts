import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrumpsModule } from './crumps/crumps.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST ?? 'localhost',
      port: 5432,
      username: 'postgres',
      password: process.env.PASSWORD ?? '',
      database: process.env.DATABASE ?? 'crump',
      entities: [],
      synchronize: true, //just for dev environment
      autoLoadEntities: true,
    }),
    UsersModule,
    CrumpsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
