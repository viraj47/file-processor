import { User } from "src/models/user.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CredentialDTO } from "./DTOs/credential.dto";
import { JwtService } from "@nestjs/jwt";

export class AuthService{
    constructor(@InjectModel(User.name) private userModel:Model<User>,
    private jwtService: JwtService
    ){}

    async register(credential:CredentialDTO){
        try{
          
            let user= await new this.userModel(credential).save();
            console.log(user)
            return user._id
        }
        catch(err)
        {
            return
        }
        
    }
    async login(credential:CredentialDTO){
        try{
            const query={email:credential.email,password:credential.password}
            let user:any=await this.userModel.find(query)
            if(!user)
                return
            let claims={
            tid:'123',
            oid:'321',
            aud:'aud',
            azp:'appid',
            name:user[0].username,
            email:user[0].email
            }
            let options={
                expiresIn:"1h"
            }
            let token=await this.generateToken(claims)
            return token
        }
        catch(err){
            return
        }
        
    }
    async generateToken(claims:any){
        const token = this.jwtService.signAsync(claims)
        return token
    }
}