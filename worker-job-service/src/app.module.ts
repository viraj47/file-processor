import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JobModule } from './modules/job-module/job.module';
import * as dotenv from 'dotenv';
dotenv.config(); 
@Module({
  imports: [  MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING),
    JobModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
