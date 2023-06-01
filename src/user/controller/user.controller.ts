import { Body, Controller, Get, Param, Post, Put, Patch, Delete, ParseIntPipe, HttpStatus, HttpCode, Inject, UseFilters, UseInterceptors } from "@nestjs/common";
import { UpdateUserDTO } from "../dto/update-user.dto";
import { UpdateUserPartialDTO } from "../dto/update-user-partial.dto";
import { User } from "../entity/User";
import { UserService } from "../service/user.service";
import { UserNotFoundExceptionHandler } from "../exception/user-not-found.exception.handler";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { ParamId } from "src/utils/decorators/param-id.decorator";
import { LogInterceptor } from "src/utils/interceptor/log.interceptor";

@ApiTags('User')
@Controller("users")
@UseInterceptors(LogInterceptor)
@UseFilters(new UserNotFoundExceptionHandler())
export class UserController {

    constructor(@Inject("UserService") private readonly userService: UserService) {

    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({summary: "Return a list of Users", description: "Returns a list of all users created"})
    async getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Get(":id")
    @HttpCode(HttpStatus.OK)
    @ApiOperation({summary: "Retrieves an User", description: "Returns an specific User by its ID"})
    async getUserById(@ParamId() id: number) {
        console.log({id});
        return this.userService.getUserById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({summary: "Create an User", description: "Creates an User given a Resquest Body"})
    async createUser(@Body() user: User) {
        return this.userService.createUser(user);
    }

    @Put(":id")
    @HttpCode(HttpStatus.OK)
    @ApiOperation({summary: "Updates an User Entirely", description: "Updates every field of an User by its ID"})
    async updateUser(@ParamId() id: number, @Body() user: UpdateUserDTO) {
        return this.userService.updateUserById(id, user);
    }

    @Patch(":id")
    @HttpCode(HttpStatus.OK)
    @ApiOperation({summary: "Updates Partially the User Entry", description: "Updates only the given fields of a specific User by its ID"})
    async updatePartialUser(@ParamId() id: number, @Body() user: UpdateUserPartialDTO) {
        return this.userService.updateUserPartiallyById(id, user);
    }

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({summary: "Deletes an User", description: "Deletes an User by its ID"})
    async deleteUser(@ParamId() id: number) {
        return this.userService.deleteUserById(id);
    }

}