import { Body, Controller, Headers, Inject, Post, Req, UseGuards } from "@nestjs/common";
import { AuthLoginDTO } from "../dto/auth-login.dto";
import { AuthRegisterDTO } from "../dto/auth-register.dto";
import { AuthForgotPassword } from "../dto/auth-forgot-password.dto";
import { AuthResetPasswordDTO } from "../dto/auth-reset-password.dto";
import { AuthService } from "../service/auth.service";
import { AuthGuard } from "src/utils/guards/auth.guard";

@Controller("auth")
export class AuthController {

    constructor(
        @Inject("AuthService") private readonly authService: AuthService){
    }

    @Post("login")
    async login(@Body() {email, password}: AuthLoginDTO) {
        return this.authService.login(email,password);
    }

    @Post("register")
    async register(@Body() authRegisterDTO: AuthRegisterDTO){
        return this.authService.register(authRegisterDTO);
    }

    @Post("forgot-password")
    async forgotPassword(@Body() {email}: AuthForgotPassword) {
        return this.authService.forgotPassword(email);
    }

    @Post("reset-password")
    async resetPassword(@Body() {password, jwtToken}: AuthResetPasswordDTO) {
        return this.authService.resetPassword(password, jwtToken);
    }

    @UseGuards(AuthGuard)
    @Post("me")
    async me(@Req() request) {
        return {
            auth: "ok",
            email: request.tokenPayLoad.email
        };
    }

}