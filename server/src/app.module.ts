import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrumpsModule } from './crumps/crumps.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '',
      database: 'crump',
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
