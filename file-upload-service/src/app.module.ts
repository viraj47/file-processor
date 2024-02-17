import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/auth-module/auth.module';
import { FileModule } from './modules/upload-module/file.module';
import * as dotenv from 'dotenv';
dotenv.config(); 


@Module({
  imports: [  MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING),
    UserModule,
    FileModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
