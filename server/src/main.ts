import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: process.env.CLIENT_BASE_URL ?? 'http://localhost:5173',
    credentials: true,
  });
  app.use(cookieParser());
  await app.listen(process.env.SERVER_PORT ?? 3000);
}
bootstrap();
