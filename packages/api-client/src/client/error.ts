// Predefined error

class ApiError extends Error {
    readonly details: any;
    readonly response: Response;

    constructor(response: Response, details: any) {
        const proto = new.target.prototype;
        super(JSON.stringify(details));
        this.details = details;
        this.response = response;
        Object.setPrototypeOf(this, proto);
    }
}

export class UserError extends ApiError {}

export class AuthenticationError extends UserError {}

export class NotFoundError extends UserError {}

export class ServerError extends ApiError {}
