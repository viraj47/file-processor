import { ApiProperty } from "@nestjs/swagger";
import {  IsObject,IsOptional,IsString } from "class-validator";


export class LoginDTO {
    @ApiProperty( { default: "" } )
    @IsString()
    email: string

    @ApiProperty( { default: "" } )
    @IsObject()
    password: string



}
