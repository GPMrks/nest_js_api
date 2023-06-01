import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./controller/auth.controller";
import { UserModule } from "src/user/user.module";
import { AuthServiceImpl } from "./service/impl/auth.service.impl";
import { PrismaModule } from "src/repository/prisma/prisma.module";

@Module({
    imports: [JwtModule.register({
        secret: process.env["SECRET"]
    }),
    UserModule,
    PrismaModule
    ],
    controllers: [AuthController],
    providers: [{
        provide: "AuthService",
        useClass: AuthServiceImpl
    }]
})
export class AuthModule {

}