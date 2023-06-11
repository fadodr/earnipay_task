import { Field, ObjectType } from '@nestjs/graphql';
import { Todo as TodoModel } from '@prisma/client';

@ObjectType({ isAbstract: true })
export class TodoEntity implements TodoModel {
  @Field(() => String)
  id: string;
  @Field(() => String)
  title: string;
  @Field(() => String, { nullable: true })
  description: string;
  @Field(() => Boolean)
  completed: boolean;
  @Field(() => String)
  createdById: string;
}
