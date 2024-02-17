import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { FileController } from "./job.controller";
import { FileService } from "./job.service";
import { Job,JobSchema } from "src/models/job.model";
import { JwtModule } from '@nestjs/jwt';



@Module({
    imports: [
    MongooseModule.forFeature( [{ name: Job.name, schema:JobSchema }] ),
    ],
    controllers: [ FileController],
    providers: [FileService],
}
)

export class JobModule{}