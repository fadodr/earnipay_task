import { ApiError, ErrorDetailsDescriptor } from './api.error';

export class UnAuthorizedError extends ApiError {
  override _details: ErrorDetailsDescriptor = null;
  _statusCode = 401;
  _message: string;

  constructor(message: string) {
    super(message, 'UNAUTHORIZED_ERROR');
    this._message = message;

    Object.setPrototypeOf(this, UnAuthorizedError.prototype);
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
