import { ApiError, ErrorDetailsDescriptor } from './api.error';

export class ConflictError extends ApiError {
  override _details: ErrorDetailsDescriptor = null;
  _statusCode = 409;
  _message: string;

  constructor(message: string) {
    super(message, 'CONFLICT_ERROR');
    this._message = message;

    Object.setPrototypeOf(this, ConflictError.prototype);
  }

  get statusCode(): number {
    return this._statusCode;
  }

  get message(): string {
    return this._message;
  }

  get details(): ErrorDetailsDescriptor {
    return this._details;
  }
}
