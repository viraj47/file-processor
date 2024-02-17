import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

 
  const config = new DocumentBuilder()
  .setTitle('file-upload-service')
  .setDescription('Description')
  .setVersion('1.0')
  .addTag('file upload')
  .addBearerAuth()
  .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  dotenv.config()  
  await app.listen(process.env.PORT||3000);
}
bootstrap();
