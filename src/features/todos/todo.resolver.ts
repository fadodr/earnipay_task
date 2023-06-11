import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { TodoEntity } from './entities/todo.entity';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import {
  CreateTodoSchema,
  fetchTodoSchema,
  findAllTodoSchema,
  removeTodoSchema,
  updateTodoSchema,
} from './dto';
import { calculatePagination, joiValidate } from '../../helpers';
import { CurrentUser } from '../../decorators';
import { IUser } from 'src/middlewares/auth.middleware';

@Resolver(() => TodoEntity)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Mutation(() => TodoEntity)
  createTodo(
    @Args('createTodoInput') createTodoInput: CreateTodoInput,
    @CurrentUser() user: IUser,
  ) {
    joiValidate(CreateTodoSchema, createTodoInput);
    return this.todoService.create(createTodoInput, user.id);
  }

  @Query(() => [TodoEntity], { name: 'todos' })
  findAll(
    @Args('page', { type: () => Int, nullable: true }) page?: number,
    @Args('perPage', { type: () => Int, nullable: true }) perPage?: number,
  ) {
    joiValidate(findAllTodoSchema, { page, perPage });
    const { offset, limit } = calculatePagination(page, perPage);
    return this.todoService.findAll(offset, limit);
  }

  @Query(() => TodoEntity, { name: 'todo' })
  findOne(@Args('id', { type: () => String }) id: string) {
    joiValidate(fetchTodoSchema, { id });
    return this.todoService.findOne(id);
  }

  @Mutation(() => TodoEntity)
  updateTodo(
    @Args('updateTodoInput') updateTodoInput: UpdateTodoInput,
    @CurrentUser() user: IUser,
  ) {
    joiValidate(updateTodoSchema, updateTodoInput);
    return this.todoService.update(
      updateTodoInput.id,
      updateTodoInput,
      user.id,
    );
  }

  @Mutation(() => Boolean)
  removeTodo(
    @Args('id', { type: () => String }) id: string,
    @CurrentUser() user: IUser,
  ) {
    joiValidate(removeTodoSchema, { id });
    return this.todoService.remove(id, user.id);
  }
}
