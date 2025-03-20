import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { envConfig } from './shared/config/app.config';
import bodyParser from 'body-parser';
import { AppController } from './app.controller';
import { ClassSerializerInterceptor } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  const globalPrefix: string = envConfig.api.prefix || 'api/master';
  const appController = app.get(AppController);
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const port = Number(envConfig.http.port);
  app.getHttpAdapter().getInstance().set('etag', false);
  await app.listen(port);
}
bootstrap();
