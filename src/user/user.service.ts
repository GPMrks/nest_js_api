import { Injectable } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { User } from "./entity/User";

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) {

    }

    async createUser(user: User): Promise<CreateUserDTO> {
        await this.prisma.user.create({
            data: user
        });
        const userDTO = User.toDTO(user);
        return userDTO;
    }

    async getAllUsers() {
        return this.prisma.user.findMany();
    }

    async getUserById(id: number) {
        return this.prisma.user.findUnique({
            where: {id}
        });
    }
}