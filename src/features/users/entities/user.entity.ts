import { Field, ObjectType } from '@nestjs/graphql';
import { User as UserModel } from '@prisma/client';

@ObjectType({ isAbstract: true })
export class UserEntity implements UserModel {
  @Field(() => String)
  id: string;
  @Field(() => String)
  name: string;
  @Field(() => String)
  email: string;
  @Field(() => String)
  password: string;
}

@ObjectType()
class TokenData {
  @Field(() => String)
  token: string;

  @Field(() => String)
  expiresIn: string;
}

@ObjectType()
export class AuthPayload {
  @Field(() => TokenData)
  tokenData: TokenData;

  @Field(() => UserEntity)
  user: UserEntity;
}
