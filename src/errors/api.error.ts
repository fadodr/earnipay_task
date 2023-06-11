export type ErrorDetailsDescriptor = Array<{
  message: string;
  path: string;
}> | null;

import { ApolloError } from 'apollo-server-express';

export abstract class ApiError extends ApolloError {
  abstract _statusCode: number;
  abstract _message: string;
  abstract _details: ErrorDetailsDescriptor;

  constructor(message: string, code: string) {
    super(message, code, { name: 'ApiError' });

    Object.setPrototypeOf(this, ApiError.prototype);
  }

  abstract get statusCode(): number;
  abstract override get message(): string;
  abstract get details(): ErrorDetailsDescriptor;
}
