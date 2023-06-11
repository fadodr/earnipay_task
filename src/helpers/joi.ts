import { UnProcessableError } from '../errors';
import * as Joi from 'joi';

export const joiValidate = (schema: Joi.ObjectSchema<any>, obj: any) => {
  const { error, value } = schema.validate(obj);
  if (error) {
    const errorMessage = error.message.replace(/"/g, '');
    throw new UnProcessableError(errorMessage);
  }
  return value;
};
