import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from './modules/file-module/file.module';
import * as dotenv from 'dotenv';
dotenv.config(); 

@Module({
  imports: [  MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING),
    FileModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
