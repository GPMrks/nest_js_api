import { Body, Controller, Get, Param, Post, Put, Patch, Delete, ParseIntPipe } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { UpdateUserPartialDTO } from "./dto/update-user-partial.dto";

@Controller("users")
export class UserController {

usersList:any[] = [];

    @Get()
    async getAllUsers() {
        return {users:[]};
    }

    @Get(":id")
    async getUser(@Param("id", ParseIntPipe) id: number) {
        return {user:{}, id};
    }

    @Post()
    async createUser(@Body() {name, email, password}: CreateUserDTO) {
        return {name, email, password};
    }

    @Put(":id")
    async updateUser(@Body() {name, email, password}: UpdateUserDTO, @Param("id", ParseIntPipe) id: number) {
        return {
            method: "put",
            name, email, password,
            id
        };
    }

    @Patch(":id")
    async updatePartialUser(@Body() {name, email, password}: UpdateUserPartialDTO, @Param("id", ParseIntPipe) id: number) {
        return {
            method: "patch",
            name, email, password,
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