import { Body, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors,HttpStatus,HttpException } from "@nestjs/common";
import { CreateJobDTO } from "./DTOs/CreateJob.dto";
import { FileService } from "./job.service";
import { Express } from 'express'
import { Binary } from "mongodb";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiConsumes } from "@nestjs/swagger";
import multer from "multer";
import { JwtDecode } from "src/decorators/jwtDecode";

@Controller('v1')
export class FileController{

    constructor(private readonly fileService:FileService){}
    @Post('job')
    async createJob(@Body() createJobDTO:CreateJobDTO,@Res() res:any){
      try{
        console.log("job obj",createJobDTO)
        let id= await this.fileService.createJob(createJobDTO)
        
        if(!id)
          throw new HttpException("Not Created",HttpStatus.INTERNAL_SERVER_ERROR)
        res.status(HttpStatus.CREATED).json({id:id})

      }
      catch(err){
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error:err})
      }
    }

    
    @Get('job/:id/status')
    async getJobStaus(@Param('id') id:string,@Res() res:any ){
      try{
        let status= await this.fileService.getobStatus(id)
        if(!status)
          throw new HttpException("Not Found",HttpStatus.NOT_FOUND)
        res.status(HttpStatus.OK).json({status:status})
      }
      catch(err)
      {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error:err})
      }
      
    }
}