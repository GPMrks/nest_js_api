import { IsEmail } from "class-validator";

export class AuthForgotPassword {

    @IsEmail()
    email: string;

}