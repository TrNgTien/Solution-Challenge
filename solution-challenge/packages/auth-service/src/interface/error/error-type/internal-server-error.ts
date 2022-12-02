import { IHttpError } from "../../low-level/interface";

export class InternalServerError extends Error implements IHttpError {
    // public readonly name;
    // public readonly message;
    // public readonly stack;
    public readonly status: number;
    public readonly type: string;
    public readonly details: any;

    constructor(message: string) {
        super();
        
        this.message = message
        this.stack = Error().stack;
        this.status = 500
        this.type = 'InternalServerError'
    }
}