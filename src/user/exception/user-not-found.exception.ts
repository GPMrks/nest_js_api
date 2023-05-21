import { HttpException, HttpStatus } from "@nestjs/common";

export class UserNotFoundException extends HttpException {
    constructor (id: number) {
        super("User not found with ID: " + id, HttpStatus.NOT_FOUND);
    }
}