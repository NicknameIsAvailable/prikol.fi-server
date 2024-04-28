import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('/api');
  app.use(cookieParser());
  app.enableCors({
    origin: configService.get<string>('CORS_ORIGIN'),
    credentials: true,
    exposedHeaders: 'set-cookie',
  });
  await app.listen(4200);
}
bootstrap();
