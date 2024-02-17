import { ApiProperty } from "@nestjs/swagger";
import {  IsObject,IsOptional,IsString } from "class-validator";


export class getImageDTO {
    @ApiProperty()
    @IsString()
    _id: string

}
