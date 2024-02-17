import { File } from "src/models/file.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { getImageDTO } from "./DTOs/credential.dto";
import { JwtService } from "@nestjs/jwt";
import { Binary } from "mongodb";

export class FileService{
    constructor(@InjectModel(File.name) private fileModel:Model<File>,
    ){}

    async store(blob:Binary){ 
       try{
           let insertQuery={
                image:blob,
           } 
           let file=await new this.fileModel(insertQuery).save()
           return file._id
       } 
       catch(err){
         throw new Error(err)
       }
    }
    async getImage(id:string){
        try{
            const image=await this.fileModel.findById(id)
            console.log("image",image)
            if(!image)
                return
            let imageData=image.image
            return imageData
        }
        catch(err){
            return
        }
    }

}