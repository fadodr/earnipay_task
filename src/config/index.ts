import * as dotenv from 'dotenv';
dotenv.config();

export const config = Object.freeze({
  jwtSecretKey: process.env.JWT_SECRET_KEY as string,
  jwtExpiresIn: parseInt(process.env.JWT_EXPIRES_IN as string),
});
