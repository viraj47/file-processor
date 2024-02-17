import { createParamDecorator, ExecutionContext,UnauthorizedException } from '@nestjs/common';

export const JwtDecoded = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    try{
      const request = ctx.switchToHttp().getRequest();

      const jwtToken = request.headers.authorization.replace('Bearer ', '');
      const jwt = require('jsonwebtoken');
      const decodedJwt: any = jwt.verify(jwtToken, "secret");
      return decodedJwt;
    }
    catch(error){
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token has expired');
      } else if (error.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Invalid token');
      } else {
        throw new UnauthorizedException('Unauthorized');
    }
  } 
  }
);