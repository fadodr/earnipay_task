import { ApiError, ErrorDetailsDescriptor } from './api.error';

export class ForbiddenError extends ApiError {
  override _details: ErrorDetailsDescriptor = null;
  _statusCode = 403;
  _message: string;

  constructor(message: string) {
    super(message, 'FORBIDDEN_ERROR');
    this._message = message;

    Object.setPrototypeOf(this, ForbiddenError.prototype);
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
