import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(
        private jwtService:JwtService
    ){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean>{
        const request=context.switchToHttp().getRequest()
        return this.ValidateRequest(request)
    }

    async ValidateRequest(request:any):Promise<boolean>{
        const authHeaders=request.headers['authorization']

        if(!authHeaders){
            throw new UnauthorizedException('Auth is missing')
        }

        try {
            const token=authHeaders.split(' ')[1]
            const secret='12345'
            const decoded=this.jwtService.verify(token, {secret:secret})
            request.user=decoded
            return true
        } catch (error) {
            throw new UnauthorizedException('Wrong Auth')
        }

        
    }
}

@Injectable()
export class RoleGuard implements CanActivate{
    constructor(
        private reflector:Reflector
    ){}

    canActivate(context: ExecutionContext): boolean {
        const roles=this.reflector.get<string[]>('roles', context.getHandler())
        if(!roles){
            return true
        }
        const request=context.switchToHttp().getRequest()
        const user=request.user

        if(!user.roles || !user){
            throw new Error('Missing roles')
        }
        return roles.some(role=>user.roles.includes(role))
    }
}