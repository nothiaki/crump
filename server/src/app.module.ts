import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrumpsModule } from './crumps/crumps.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: parseInt(process.env.DB_PORT) ?? 5432,
      username: 'postgres',
      password: process.env.DB_PASSWORD ?? '',
      database: process.env.DB_NAME ?? 'crump',
      entities: [],
      synchronize: true, //just for dev environment
      autoLoadEntities: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET ?? '34fa7533b4d552496845ecac47f7af1e78f6894443bc263b7df1b489059671a9',
      signOptions: { expiresIn: '8h' },
    }),
    UsersModule,
    CrumpsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
