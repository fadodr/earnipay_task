import { Injectable, NestMiddleware } from '@nestjs/common';
import { ForbiddenError } from 'apollo-server-express';
import { Request, Response, NextFunction } from 'express';
import { validateToken } from '../helpers';
import { config } from '../config';
import { JwtPayload } from 'jsonwebtoken';

export interface IUser {
  id: string;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    let user: IUser | null;
    const tokenHeader = req.get('Authorization');
    if (!tokenHeader) {
      user = null;
      req['context'] = user;
      return next();
    }

    let tokenDetails: string | JwtPayload;
    try {
      const token = tokenHeader.split(' ')[1];
      if (!token) throw new ForbiddenError('Token must be bearer');

      tokenDetails = validateToken(token, config.jwtSecretKey);
    } catch (error: any) {
      user = null;
      req['context'] = user;
      throw new ForbiddenError(error.message);
    }

    user = tokenDetails as IUser;
    req['context'] = user;
    next();
  }
}
