import { Body, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { getImageDTO } from "./DTOs/credential.dto";
import { FileService } from "./file.service";
import { Express } from 'express'
import { HttpStatus,HttpException } from "@nestjs/common";
import { Binary } from "mongodb";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiConsumes } from "@nestjs/swagger";
import multer from "multer";
import axios from "axios";
import { CreateJobDTO } from "./DTOs/createJob.dto";
import { JwtDecoded } from "src/custom-decorators/fetchEmail";
import { emitWarning } from "process";




@ApiBearerAuth()
@Controller('upload')
export class FileController{

    constructor(private readonly fileService:FileService){}
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
          type: 'object',
          properties: {
            file: { 
              type: 'string',
              format: 'binary',
            },
          },
        },
      })
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async login(@UploadedFile() file:Express.Multer.File,@JwtDecoded() decodedToken:any,@Res() res:any){
      try{
        
        let imageID= await this.fileService.sendBiaryData(file.buffer.toString('base64'))
        if(!imageID)
          throw new HttpException("Not Created",HttpStatus.INTERNAL_SERVER_ERROR)
        console.log(decodedToken)
        let createJobDTO:CreateJobDTO={
          created_by:decodedToken.email,
          image_id:imageID.id,
          client_id:decodedToken.oid,
          tenet_id:decodedToken.tid
        }
        let jobID=await this.fileService.createJob(createJobDTO)
        if(!jobID)
          throw new HttpException("Not Created",HttpStatus.INTERNAL_SERVER_ERROR)
        res.status(HttpStatus.CREATED).json({imageId:imageID.id,jobID:jobID.id})
      } 
      catch(err){
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error:err})
      }  
    }
    @Get('job/:id/status')
    async getJobStaus(@Param('id') id:string,@JwtDecoded() decodedToken:any, @Res() res:any){
      try{
        let status= await this.fileService.getJobStatus(id)
        console.log(status)
        if(!status) 
          throw new HttpException("Not Found",HttpStatus.NOT_FOUND)
        res.status(HttpStatus.OK).json(status)
      }
      catch(err){
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error:err})
      }
    }
           
    
}