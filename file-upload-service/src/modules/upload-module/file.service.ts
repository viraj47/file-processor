import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { getImageDTO } from "./DTOs/credential.dto";
import { JwtService } from "@nestjs/jwt";
import { Binary } from "mongodb";
import axios from "axios";
import * as FormData from 'form-data';
import { CreateJobDTO } from "./DTOs/createJob.dto";

export class FileService{
    constructor(
    ){}

    async sendBiaryData(file){
        try{
        let response = await axios.post(`${process.env.BLOB_SERVICE_URL}/v1/blob`, {file}, {
            headers: {
                "Content-Type": 'application/json',
            }
        });
        console.log("file response ",response.data)
        return response.data
        }catch(err){
            return
        }
    }
    async createJob(createJobDTO:CreateJobDTO){
        try{
            let response = await axios.post(`${process.env.WORKER_SERVICE_URL}/v1/job/`,createJobDTO,{
            headers:{
                "Content-Type":'application/json'
            }
            })
            console.log("job response",response.data)
            return response.data
        }
        catch(err)
        {
            return
        }
        
    }
    async getJobStatus(id:string){
        try{
            let response = await axios.get(`${process.env.WORKER_SERVICE_URL}/v1/job/${id}/status`)
            return response.data
        }
        catch(err)
        {
            return
        }
    }


}