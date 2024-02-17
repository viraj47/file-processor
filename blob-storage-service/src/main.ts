import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  dotenv.config()

  const config = new DocumentBuilder()
  .setTitle('blob-storage-service')
  .setDescription('Description')
  .setVersion('1.0')
  .addTag('blob storage')
  .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
 
  await app.listen(process.env.PORT||3001);
}
bootstrap();
