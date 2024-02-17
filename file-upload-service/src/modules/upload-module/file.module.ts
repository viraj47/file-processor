import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { FileController } from "./file.controller";
import { FileService } from "./file.service";
import { JwtModule } from '@nestjs/jwt';



@Module({
    imports: [
    ],
    controllers: [ FileController],
    providers: [FileService],
}
)

export class FileModule{}