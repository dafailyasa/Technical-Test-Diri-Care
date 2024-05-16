import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.setGlobalPrefix(process.env.API_PREFIX);
  const swaggerCfg = new DocumentBuilder()
    .setTitle('Booking Room Building - API')
    .setDescription('this swagger documentation for API booking room building')
    .setVersion('1.0')
    .build();

  const docs = SwaggerModule.createDocument(app, swaggerCfg);
  SwaggerModule.setup('docs', app, docs);

  await app.listen(process.env.PORT);
}
bootstrap();
