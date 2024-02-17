import { Body, Controller, Get, Post, Req, Res, UploadedFile, UseInterceptors,HttpStatus,HttpException, Param } from "@nestjs/common";
import { getImageDTO } from "./DTOs/credential.dto";
import { FileService } from "./file.service";
import { Express } from 'express'
import { Binary } from "mongodb";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes } from "@nestjs/swagger";
import multer from "multer";



@Controller('v1')
export class FileController{

    constructor(private readonly fileService:FileService){}

    @Get("blob/:id")
    async getImage(@Param('id') id:string,@Res() res:any){
        try{
          console.log(id)
          const data:Binary=await this.fileService.getImage(id)
          if(!data)
            throw new HttpException("Not Found",HttpStatus.NOT_FOUND)
          res.setHeader('Content-Type', 'image/jpg');
          res.setHeader('Content-Disposition', `attachment; filename="image.jpg"`);
          res.send(data.buffer);
        }
        catch(err){
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error:err})
        }
        
    }
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
          type: 'object',
          properties: {
            file: { // 👈 this property
              type: 'string',
              format: 'binary',
            },
          },
        },
      })
    @Post("blob")

    async storev2(@Body() payload,@Res()res:any){
        try{
          if(!payload)
            throw new HttpException("File not provided",HttpStatus.BAD_REQUEST)
          let file=Buffer.from(payload.file, 'base64')
          const data = new Binary(file);
          let id= await this.fileService.store(data)
          res.status(HttpStatus.CREATED).json({id:id})
        }
        catch(err){
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error:err})
        }
       
    }
    
}