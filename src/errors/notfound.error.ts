import { ApiError, ErrorDetailsDescriptor } from './api.error';

export class NotFoundError extends ApiError {
  override _details: ErrorDetailsDescriptor = null;
  _statusCode = 404;
  _message: string;

  constructor(message: string) {
    super(message, 'NOT_FOUND_ERROR');
    this._message = message;

    Object.setPrototypeOf(this, NotFoundError.prototype);
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
