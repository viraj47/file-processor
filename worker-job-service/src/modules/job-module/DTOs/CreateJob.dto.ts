import { ApiProperty } from "@nestjs/swagger";
import {  IsObject,IsOptional,IsString } from "class-validator";


export class CreateJobDTO {
    @ApiProperty()
    @IsString()
    image_id: string

    @ApiProperty()
    @IsString()
    created_by: string

    @ApiProperty()
    @IsString()
    tenet_id: string

    @ApiProperty()
    @IsString()
    client_id: string

}
