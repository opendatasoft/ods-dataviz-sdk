// Predefined error

class ApiError extends Error {
  readonly details: any;
  readonly response: Response;

  constructor(response: Response, details: any) {
    super(`API Error : ${JSON.stringify(details)}`);
    this.details = details;
    this.response = response;
  }
}

export class UserError extends ApiError {}

export class AuthenticationError extends UserError {}

export class ServerError extends ApiError {}
