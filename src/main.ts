import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as compression from 'compression';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {
  ValidationPipe,
  VersioningType,
  VERSION_NEUTRAL,
} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors();
  app.use(
    helmet({
      crossOriginResourcePolicy: false,
    }),
  );
  app.use(compression());

  app.enableVersioning({
    defaultVersion: VERSION_NEUTRAL,
    type: VersioningType.URI,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const documentBuilder = new DocumentBuilder()
    .setTitle('Drinaluza')
    .setDescription('Drinaluza API description')
    .setVersion('1.0')
    .addTag('drinaluza')
    .build();
  const document = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup('docs', app, document);

  await app.listen(configService.get('app.port'));
}
bootstrap();
