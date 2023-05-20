import { IsEmail, IsString, IsStrongPassword, Min } from "class-validator";
import { CreateUserDTO } from "../dto/create-user.dto";

export class User {

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsStrongPassword({
        minLength: 6,
        minNumbers: 0,
        minLowercase: 0,
        minSymbols: 0,
        minUppercase: 0
    })
    password: string;

    static toDTO(user: User): CreateUserDTO {
        const userDto = new CreateUserDTO();
        userDto.name = user.name;
        userDto.email = user.email;
        return userDto;
    }
}