import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserNotFoundException } from './user-not-found.exception';

@Catch(UserNotFoundException)
export class UserNotFoundExceptionHandler implements ExceptionFilter {
  
    catch(exception: UserNotFoundException, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.getResponse();

    response
      .status(status)
      .json({
        statusCode: status,
        message: message,
        path: request.url,
        timestamp: new Date().toISOString(),
      });
  }
}