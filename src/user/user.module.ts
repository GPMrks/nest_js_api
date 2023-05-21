import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { UserServiceImpl } from "./service/impl/user.service.impl";

@Module({
    imports: [PrismaModule],
    controllers: [UserController],
    providers: [{
        provide: "UserService",
        useClass: UserServiceImpl
    }],
    exports: []
})
export class UserModule {}