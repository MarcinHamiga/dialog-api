import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  )
    app.enableCors({
        origin: true,
        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    });
  await app.listen(process.env.PORT ?? 3000, "0.0.0.0");
  console.log(`Application running on ${await app.getUrl()}`)
}

bootstrap();
