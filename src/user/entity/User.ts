import { IsDateString, IsEmail, IsOptional, IsString, IsStrongPassword, Min, isDateString } from "class-validator";
import { UserDTO } from "../dto/user.dto";
import { ApiProperty } from "@nestjs/swagger";

export class User {

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsStrongPassword({
        minLength: 6,
        minNumbers: 0,
        minLowercase: 0,
        minSymbols: 0,
        minUppercase: 0
    })
    password: string;

    @ApiProperty()
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