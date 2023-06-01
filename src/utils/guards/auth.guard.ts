import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { request } from "http";
import { Observable } from "rxjs";
import { AuthService } from "src/auth/service/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(@Inject("AuthService") private readonly authService: AuthService){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        
        const request = context.switchToHttp().getRequest();
        const {authorization} = request.headers;

        try {
            const data = this.authService.checkToken((authorization ?? '').split(' ')[1]);

            request.tokenPayLoad = data;

            return true;
        } catch (error) {
            return false;
        }

    }

}