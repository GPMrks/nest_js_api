import { PartialType } from "@nestjs/mapped-types";
import { User } from "../entity/User";

export class UpdateUserPartialDTO extends PartialType(User) {

}