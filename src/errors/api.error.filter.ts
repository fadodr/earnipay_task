import type { ArgumentsHost } from '@nestjs/common';
import { Catch, ContextType } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { Response } from 'express';
import { ApiError } from './api.error';

@Catch(ApiError)
export class ApiErrorFilter implements GqlExceptionFilter {
  catch(exception: ApiError, host: ArgumentsHost): ApiError | void {
    if (exception.extensions.code == 'INTERNAL_SERVER_ERROR') {
      console.error(
        `internal server error: ${exception.message}\n${exception.stack}`,
      );
    }
    switch (host.getType() as ContextType | 'graphql') {
      case 'graphql':
        exception.extensions = {
          ...exception.extensions,
          statusCode: exception.statusCode,
        };
        return exception;
      default:
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();
        const status = exception.getStatus();
        res.status(status).json({
          ...exception,
        });
        break;
    }
  }
}
