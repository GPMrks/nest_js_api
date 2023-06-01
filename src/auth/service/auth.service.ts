import { User } from "@prisma/client";
import { AuthRegisterDTO } from "../dto/auth-register.dto";

export interface AuthService {

    createToken(user: User);

    checkToken(jwtToken: string);

    isTokenValid(jwtToken: string);

    login(email: string, password: string);

    forgotPassword(email: string);

    resetPassword(password: string, jwtToken: string);

    register(authRegisterDTO: AuthRegisterDTO);

}