import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { FileController } from "./file.controller";
import { FileService } from "./file.service";
import { File, FileSchema } from "src/models/file.model";
import { JwtModule } from '@nestjs/jwt';





@Module({
    imports: [
  
    MongooseModule.forFeature( [{ name: File.name, schema:FileSchema }] ),
    ],
    controllers: [ FileController],
    providers: [FileService],
}
)

export class FileModule{}