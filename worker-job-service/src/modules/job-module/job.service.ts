import { Job } from "src/models/job.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateJobDTO } from "./DTOs/CreateJob.dto";
import { JwtService } from "@nestjs/jwt";
import { Binary } from "mongodb";

export class FileService{
    constructor(@InjectModel(Job.name) private fileModel:Model<Job>,
    ){}

    async createJob(createJobDTO:CreateJobDTO){
        try{
            let job={
                created_by:createJobDTO.created_by,
                image_id:createJobDTO.image_id,
                status:['RUNNING','SUCCESS','FAILED'].filter(() => Math.random() < 0.5)[0],
                client_id:createJobDTO.client_id,
                tenet_id:createJobDTO.tenet_id
            }
            console.log("dto",job)
            let savedJob=await new this.fileModel(job).save();
            return savedJob._id
        }
        catch(err){
            console.log("job error",err)
            return
        }
        
    }

    async getobStatus(id:string){
        try{
        let job= await this.fileModel.findById(id)
        if(!job)
            return
        return job.status
        }
        catch(err){
            return
        }
    }

}