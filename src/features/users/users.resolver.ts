import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { SignupUserInput, LoginUserInput } from './dto';
import { joiValidate } from '../../helpers';
import { signupUserSchema, loginUserSchema } from '../../validations';
import { AuthPayload } from './entities/user.entity';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => AuthPayload)
  signup(@Args('signupUserinput') signupUserinput: SignupUserInput) {
    joiValidate(signupUserSchema, signupUserinput);
    return this.usersService.signup(signupUserinput);
  }

  @Mutation(() => AuthPayload)
  login(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    joiValidate(loginUserSchema, loginUserInput);
    return this.usersService.login(loginUserInput);
  }
}
