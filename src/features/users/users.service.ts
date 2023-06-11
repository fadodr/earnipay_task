import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupUserInput, LoginUserInput } from './dto';
import { ConflictError, UnAuthorizedError } from '../../errors';
import { computeExpiryDate, generateToken } from '../../helpers';
import * as bcrypt from 'bcryptjs';
import { config } from '../../config';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async signup(signupUserinput: SignupUserInput) {
    const { email, password } = signupUserinput;
    const existEmail = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (existEmail) throw new ConflictError('Email already exist');
    const hashPwd = await bcrypt.hash(password, 15);
    const newUser = await this.prismaService.user.create({
      data: {
        ...signupUserinput,
        password: hashPwd,
      },
    });

    const token = generateToken(newUser);
    const expiresIn = computeExpiryDate(config.jwtExpiresIn).toISOString();

    return {
      tokenData: {
        token,
        expiresIn,
      },
      user: newUser,
    };
  }

  async login(loginUserinput: LoginUserInput) {
    const { email, password } = loginUserinput;
    const existingUser = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (!existingUser) throw new UnAuthorizedError('Invalid email or password');

    const isPwdCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPwdCorrect) throw new UnAuthorizedError('Invalid email or password');

    const token = generateToken(existingUser);

    return {
      tokenData: {
        token,
        expiresIn: computeExpiryDate(config.jwtExpiresIn).toISOString(),
      },
      user: existingUser,
    };
  }
}
