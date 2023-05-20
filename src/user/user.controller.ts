import { Body, Controller, Get, Param, Post, Put, Patch, Delete, ParseIntPipe } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { UpdateUserPartialDTO } from "./dto/update-user-partial.dto";
import { UserService } from "./user.service";
import { User } from "./entity/User";

@Controller("users")
export class UserController {

    constructor(private readonly userService: UserService) {

    }

    @Get()
    async getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Get(":id")
    async getUserById(@Param("id", ParseIntPipe) id: number) {
        return this.userService.getUserById(id);
    }

    @Post()
    async createUser(@Body() user: User) {
        return this.userService.createUser(user);
    }

    @Put(":id")
    async updateUser(@Body() {name, email}: UpdateUserDTO, @Param("id", ParseIntPipe) id: number) {
        return {
            method: "put",
            name, email,
            id
        };
    }

    @Patch(":id")
    async updatePartialUser(@Body() {name, email}: UpdateUserPartialDTO, @Param("id", ParseIntPipe) id: number) {
        return {
            method: "patch",
            name, email,
            id
        };
    }

    @Delete(":id")
    async deleteUser(@Param("id", ParseIntPipe) id: number) {
        return {
            message: "Successfully Deleted",
            id: id
        };
    }

}