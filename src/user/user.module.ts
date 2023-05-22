import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { UserController } from "./controller/user.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { UserServiceImpl } from "./service/impl/user.service.impl";
import { UserIdCheckMiddleware } from "src/middleware/user-id-check.middleware";

@Module({
    imports: [PrismaModule],
    controllers: [UserController],
    providers: [{
        provide: "UserService",
        useClass: UserServiceImpl
    }],
    exports: []
})
export class UserModule implements NestModule {

    configure(consumer: MiddlewareConsumer) {
        consumer.apply(UserIdCheckMiddleware).forRoutes({
            path: "users/:id",
            method: RequestMethod.ALL
        });
    }

}