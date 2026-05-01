import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    // Handle Mongo duplicate key error
    if (exception?.code === 11000) {
      const field = Object.keys(exception.keyPattern || {})[0];
      const value = exception.keyValue?.[field];

      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: `${field} '${value}' already exists`,
        error: 'Duplicate Key',
      });
    }

    // fallback
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: 500,
      message: 'Internal server error',
    });
  }
}
