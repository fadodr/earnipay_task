import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtPayload } from 'jsonwebtoken';
import { UnAuthorizedError } from './errors';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): JwtPayload | string => {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req['context'];

    if (!user) throw new UnAuthorizedError('You are not logged in');
    return user;
  },
);
