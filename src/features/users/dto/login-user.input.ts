import { Field, InputType } from '@nestjs/graphql';

@InputType({ isAbstract: true })
export class LoginUserInput {
  @Field(() => String)
  email: string;
  @Field(() => String)
  password: string;
}
