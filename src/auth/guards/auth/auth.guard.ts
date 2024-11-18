import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private jwtService: JwtService){}
  
  canActivate( context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    let request:Request = context.switchToHttp().getRequest()
    const token = request.headers['token']
    
    if(!token){
      throw new UnauthorizedException("debe enviar un token")
    }
    try{
      const payload:JwtPayload =this.jwtService.verify(token)
      request.body['user_id'] = payload.user_id

    }catch(error){
      throw new UnauthorizedException("debe enviar un token valido")
    }

    return true;
  }
}
