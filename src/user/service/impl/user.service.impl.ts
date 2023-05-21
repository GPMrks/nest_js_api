import { Injectable, NotFoundException, Param } from "@nestjs/common";
import { UserDTO } from "../../dto/user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { User } from "../../entity/User";
import { UpdateUserDTO } from "../../dto/update-user.dto";
import { UpdateUserPartialDTO } from "../../dto/update-user-partial.dto";
import { UserService } from "../user.service";

@Injectable()
export class UserServiceImpl implements UserService {

    constructor(private readonly prisma: PrismaService) {

    }

    async createUser(user: User): Promise<UserDTO> {
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
        return this.verifyIfUserExistsWithId(id);
    }

    async updateUserById(id: number, user: UpdateUserDTO) {
        
        await this.verifyIfUserExistsWithId(id);

        const {name, email, password, birthday} = user;

        return this.prisma.user.update({
            data: {
                ...(name && { name }),
                ...(email && { email }),
                ...(password && { password }),
                birthday: birthday ? new Date(birthday) : null,
              },
            where: {id}
        });
    }

    async updateUserPartiallyById(id: number, user: UpdateUserPartialDTO) {
        
        await this.verifyIfUserExistsWithId(id);

        const { name, email, password, birthday } = user;

        const updatedUser: any = {
            ...(name && { name }),
            ...(email && { email }),
            ...(password && { password }),
            ...(birthday && { birthday: new Date(birthday) }),
          };

          return this.prisma.user.update({
            data: updatedUser,
            where: { id },
          });
    }

    async deleteUserById(id: number) {
        
        await this.verifyIfUserExistsWithId(id);

        return this.prisma.user.delete({
            where: {id}
        });
    }

    private async verifyIfUserExistsWithId(id: number) {
        if (!(await this.prisma.user.findUnique({where: {id}}))) {
            throw new NotFoundException("User not found with ID: " + id);
        } else {
            return this.prisma.user.findUnique({where: {id}});
        }
    }
}