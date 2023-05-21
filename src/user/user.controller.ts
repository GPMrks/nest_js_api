import { Body, Controller, Get, Param, Post, Put, Patch, Delete, ParseIntPipe, HttpStatus, HttpCode, Inject } from "@nestjs/common";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { UpdateUserPartialDTO } from "./dto/update-user-partial.dto";
import { UserServiceImpl } from "./service/impl/user.service.impl";
import { User } from "./entity/User";
import { UserService } from "./service/user.service";

@Controller("users")
export class UserController {

    constructor(@Inject("UserService") private readonly userService: UserService) {

    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Get(":id")
    @HttpCode(HttpStatus.OK)
    async getUserById(@Param("id", ParseIntPipe) id: number) {
        return this.userService.getUserById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createUser(@Body() user: User) {
        return this.userService.createUser(user);
    }

    @Put(":id")
    @HttpCode(HttpStatus.OK)
    async updateUser(@Param("id", ParseIntPipe) id: number, @Body() user: UpdateUserDTO) {
        return this.userService.updateUserById(id, user);
    }

    @Patch(":id")
    @HttpCode(HttpStatus.OK)
    async updatePartialUser(@Param("id", ParseIntPipe) id: number, @Body() user: UpdateUserPartialDTO) {
        return this.userService.updateUserPartiallyById(id, user);
    }

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteUser(@Param("id", ParseIntPipe) id: number) {
        return this.userService.deleteUserById(id);
    }

}