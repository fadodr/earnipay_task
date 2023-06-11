import { Field, InputType, OmitType } from '@nestjs/graphql';
import { UserEntity } from '../entities/user.entity';

@InputType({ isAbstract: true })
export class SignupUserInput extends OmitType(UserEntity, ['id']) {
  @Field(() => String)
  name: string;
  @Field(() => String)
  email: string;
  @Field(() => String)
  password: string;
}
