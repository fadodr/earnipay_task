//you can add any other permissions needed in this file

import { UnAuthorizedError } from 'src/errors';
import { TodoEntity } from 'src/features/todos/entities/todo.entity';

export const ensureCanUpdateOrDeleteTodo = (
  userId: string,
  todo: TodoEntity,
) => {
  if (userId != todo.createdById) {
    throw new UnAuthorizedError(
      'Access denied because this todo is not created by you',
    );
  }
};
