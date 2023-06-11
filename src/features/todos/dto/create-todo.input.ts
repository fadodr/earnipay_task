import { Field, InputType, OmitType } from '@nestjs/graphql';
import { TodoEntity } from '../entities/todo.entity';

@InputType({ isAbstract: true })
export class CreateTodoInput extends OmitType(TodoEntity, [
  'id',
  'completed',
  'createdById',
]) {
  @Field(() => String)
  title: string;
  @Field(() => String, { nullable: true })
  description: string;
}
