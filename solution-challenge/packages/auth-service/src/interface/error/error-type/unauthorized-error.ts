import { IHttpError } from "../../low-level/interface";

export class UnauthorizedError extends Error implements IHttpError {
    // public readonly name;
    // public readonly message;
    // public readonly stack;
    public readonly status: number;
    public readonly type: string;
    public readonly details: any;

    constructor(message: string) {
        super(message);
        
        this.message = message
        this.stack = Error(this.message).stack;
        this.status = 401
        this.type = 'unauthorizedError'
    }
}