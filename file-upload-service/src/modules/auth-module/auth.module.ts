import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { User, UserSchema } from "src/models/user.model";
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
dotenv.config(); 



@Module({
    imports: [
    JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '1hr' },
    }),
    MongooseModule.forFeature( [{ name: User.name, schema:UserSchema }] ),
    ],
    controllers: [ AuthController],
    providers: [AuthService],
}
)

export class UserModule{}