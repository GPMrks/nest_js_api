import { UpdateUserPartialDTO } from "../dto/update-user-partial.dto";
import { UpdateUserDTO } from "../dto/update-user.dto";
import { UserDTO } from "../dto/user.dto";
import { User } from "../entity/User";

export interface UserService {

    createUser(user: User): Promise<UserDTO>;

    getAllUsers();

    getUserById(id: number);

    updateUserById(id: number, user: UpdateUserDTO);

    updateUserPartiallyById(id: number, user: UpdateUserPartialDTO);

    deleteUserById(id: number);
}