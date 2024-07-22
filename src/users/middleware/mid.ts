import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

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