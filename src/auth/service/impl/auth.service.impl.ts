import { JwtService } from "@nestjs/jwt";
import { AuthService } from "../auth.service";
import { PrismaService } from "src/repository/prisma/prisma.service";
import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "@prisma/client";
import { AuthRegisterDTO } from "src/auth/dto/auth-register.dto";
import { UserService } from "src/user/service/user.service";

@Injectable()
export class AuthServiceImpl implements AuthService {

    private issuer = "login";
    private audience = "users";

    constructor(
        private readonly jwtService: JwtService,
        private readonly prismaService: PrismaService,
        @Inject("UserService") private readonly userService: UserService
    ){}
    
    createToken(user: User) {
        return {
            accessToken: this.jwtService.sign({
                id: user.id,
                name: user.name,
                email: user.email
            },
            {
                expiresIn: "7 days",
                issuer: this.issuer,
                audience: this.audience
            })
        };
    }

    checkToken(jwtToken: string) {
        
        try {
            const verification = this.jwtService.verify(jwtToken, {
                audience: this.audience,
                issuer: this.issuer
            });

            return verification;
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    isTokenValid(jwtToken: string) {
        try {
            this.checkToken(jwtToken);
            return true;
        } catch (error) {
            return false;
        }
    }

    async login(email: string, password: string) {
        
        const user = await this.prismaService.user.findFirst({
            where: { email, password }
        });

        if (!user) {
            throw new UnauthorizedException("Incorrect E-mail or Password.");
        }

        return this.createToken(user);

    }

    async forgotPassword(email: string) {

        const user = await this.prismaService.user.findFirst({
            where: { email }
        });

        if (!user) {
            throw new UnauthorizedException("Incorrect E-mail.");
        }

    }

    async resetPassword(password: string, jwtToken: string) {
        
        const id = 0;

        const userUpdated = await this.prismaService.user.update({
            where: { id },
            data: { password }
        });

        return this.createToken(userUpdated);

    }

    async register(authRegisterDTO: AuthRegisterDTO) {

        const user = await this.userService.createUser(authRegisterDTO);
        return this.createToken(user);
    
    }

}