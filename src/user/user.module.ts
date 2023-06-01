import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { UserController } from "./controller/user.controller";
import { PrismaModule } from "src/repository/prisma/prisma.module";
import { UserServiceImpl } from "./service/impl/user.service.impl";
import { UserIdCheckMiddleware } from "src/utils/middleware/user-id-check.middleware";

@Module({
    imports: [PrismaModule],
    controllers: [UserController],
    providers: [{
        provide: "UserService",
        useClass: UserServiceImpl
    }],
    exports: [{
        provide: "UserService",
        useClass: UserServiceImpl
    }]
})
export class UserModule implements NestModule {

    configure(consumer: MiddlewareConsumer) {
        consumer.apply(UserIdCheckMiddleware).forRoutes({
            path: "users/:id",
            method: RequestMethod.ALL
        });
    }

}