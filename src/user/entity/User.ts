import { IsDateString, IsEmail, IsOptional, IsString, IsStrongPassword, Min, isDateString } from "class-validator";
import { UserDTO } from "../dto/user.dto";

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

    @IsOptional()
    @IsDateString()
    birthday: string;

    static toDTO(user: User): UserDTO {
        const userDto = new UserDTO();
        userDto.name = user.name;
        userDto.email = user.email;
        userDto.birthday = user.birthday;
        return userDto;
    }
}