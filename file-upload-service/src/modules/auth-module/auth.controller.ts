import { Body, Controller, Post ,HttpException,HttpStatus, Res} from "@nestjs/common";
import { CredentialDTO } from "./DTOs/credential.dto";
import { AuthService } from "./auth.service";
import { LoginDTO } from "./DTOs/login.dto";


@Controller('Authentication')
export class AuthController{

    constructor(private readonly authService:AuthService){}
    @Post("login")
    async login(@Body() credentials:LoginDTO, @Res() res:any){
        try{
        
            let token= await this.authService.login(credentials)
            if(!token)
                throw new HttpException("Wrong Credentials",HttpStatus.UNAUTHORIZED)
            res.status(HttpStatus.OK).json({token:token})
        }
        catch(err){
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error:err})
        }
       
    }
    @Post("register")
    async register(@Body() credentials:CredentialDTO,@Res() res:any){
        try{
            let id= await this.authService.register(credentials);   
            if(!id)
                throw new HttpException("Internal Server Erorr",HttpStatus.INTERNAL_SERVER_ERROR)
            else
                res.status(HttpStatus.CREATED).json({id:id})

        }
        catch(err)
        {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error:err})
        }
        
    }
}