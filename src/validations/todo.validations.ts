/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as Joi from 'joi';
import * as joiObjectId from 'joi-objectid';
//@ts-ignore
Joi.objectId = joiObjectId(Joi);
//@ts-ignore
const objectId = Joi.objectId;

export const CreateTodoSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

export const fetchTodoSchema = Joi.object({
  id: objectId().required(),
});

export const removeTodoSchema = Joi.object({
  id: objectId().required(),
});

export const updateTodoSchema = Joi.object({
  id: objectId().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
});

export const findAllTodoSchema = Joi.object({
  page: Joi.number().when('perPage', {
    is: Joi.exist(),
    then: Joi.required(),
  }),
  perPage: Joi.number(),
});
