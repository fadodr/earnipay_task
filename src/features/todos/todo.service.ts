import { Injectable } from '@nestjs/common';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConflictError } from '../../errors';
import { NotFoundError } from '../../errors';
import { ensureCanUpdateOrDeleteTodo } from '../../helpers';

@Injectable()
export class TodoService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createTodoInput: CreateTodoInput, userId: string) {
    const existingTodo = await this.prismaService.todo.findFirst({
      where: { title: createTodoInput.title },
    });
    if (existingTodo) throw new ConflictError('Title already exist');
    return await this.prismaService.todo.create({
      data: {
        ...createTodoInput,
        createdById: userId,
      },
    });
  }

  async findAll(offset: number, limit: number) {
    return this.prismaService.todo.findMany({
      skip: offset,
      take: limit || undefined,
    });
  }

  async findOne(id: string) {
    const todo = await this.prismaService.todo.findUnique({ where: { id } });
    if (!todo) throw new NotFoundError('Todo not found');
    return todo;
  }

  async update(id: string, updateTodoInput: UpdateTodoInput, userId: string) {
    const todo = await this.prismaService.todo.findUnique({ where: { id } });
    if (!todo) throw new NotFoundError('Todo not found');

    ensureCanUpdateOrDeleteTodo(userId, todo);

    return await this.prismaService.todo.update({
      where: { id },
      data: {
        title: updateTodoInput.title,
        description: updateTodoInput.description,
      },
    });
  }

  async remove(id: string, userId: string) {
    const todo = await this.prismaService.todo.findUnique({ where: { id } });
    if (!todo) throw new NotFoundError('Todo not found');

    ensureCanUpdateOrDeleteTodo(userId, todo);

    await this.prismaService.todo.delete({ where: { id } });
    return true;
  }
}
