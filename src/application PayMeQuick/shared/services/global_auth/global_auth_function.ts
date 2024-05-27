

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException,} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import * as dotenv from 'dotenv';
import { json } from 'stream/consumers';
dotenv.config();
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
    
      if(request.headers.application != "PAYMEQUICK") return true;
      console.log(request.headers.application)
      console.log(request.params)
      console.log(request.body)
    //   console.log(request.)
      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        const payload = await this.jwtService.verifyAsync(token, {secret: process.env.JWT_SECRET_PAYMEQUICK});
        // 💡 We're assigning the payload to the request object here
        // so that we can access it in our route handlers
        request['user'] = payload;
        console.log(JSON.stringify(payload))
      } catch {
        throw new UnauthorizedException();
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      console.log(request.headers)
      return type === 'Bearer' ? token : undefined;
    }
  }