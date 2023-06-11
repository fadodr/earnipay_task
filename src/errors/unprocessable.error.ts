import { ApiError, ErrorDetailsDescriptor } from './api.error';

export class UnProcessableError extends ApiError {
  override _details: ErrorDetailsDescriptor = null;
  _statusCode = 422;
  _message: string;

  constructor(message: string) {
    super(message, 'UNPROCESSABLE_ENTITY_ERROR');
    this._message = message;

    Object.setPrototypeOf(this, UnProcessableError.prototype);
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
