// Predefined error
/* eslint-disable max-classes-per-file */

class ApiError extends Error {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    readonly details: any;

    readonly response: Response;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
