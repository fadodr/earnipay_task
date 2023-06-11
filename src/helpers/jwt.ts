import * as jwt from 'jsonwebtoken';
import { config } from '../config';
import { UserEntity } from 'src/features/users/entities/user.entity';
import { ForbiddenError } from '../errors';

export const generateToken = (user: UserEntity) => {
  const accessToken = jwt.sign({ id: user.id }, config.jwtSecretKey, {
    expiresIn: config.jwtExpiresIn,
  });
  return accessToken;
};

export const validateToken = (token: string, secretKey: string) => {
  try {
    const user = jwt.verify(token, secretKey);
    if (!user) return;
    return user;
  } catch (error: any) {
    throw new ForbiddenError(error.message);
  }
};
