import { BadRequestException, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";


export class UserIdCheckMiddleware implements NestMiddleware {
   
    use(req: Request, res: Response, next: NextFunction) {
        
        console.log("UserIDCheckMiddleware", "before");

        if (isNaN(Number(req.params.id)) || Number(req.params.id) <= 0) {
            throw new BadRequestException("Not a valid ID!");
        }

        console.log("UserIDCheckMiddleware", "after");

        next();

    }
}