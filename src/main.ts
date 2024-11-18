import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.setGlobalPrefix("api"); 
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remueve propiedades no definidas en el DTO
      forbidNonWhitelisted: true, // Lanza un error si se envían propiedades no permitidas
      transform: true, // Transforma datos según los tipos definidos en el DTO
    }),
  );
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
