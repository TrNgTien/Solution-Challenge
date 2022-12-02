import { IHttpError } from "../../low-level/interface";

export class BadRequestError extends Error implements IHttpError {
    // public readonly name;
    // public readonly message;
    // public readonly stack;
    public readonly status: number;
    public readonly type: string;
    public readonly details: any;

    constructor(message: string, details?: any) {
        super(message);
        
        this.stack = Error(this.message).stack;
        this.status = 400;
        this.details = details;
        this.type = 'BadRequestError'
    }
}