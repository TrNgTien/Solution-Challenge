import { IErrorFactory } from "../low-level/interface";
import { BadRequestError } from "./error-type/bad-request-error";
import { ForbiddenError } from "./error-type/forbidden-error";
import { InternalServerError } from "./error-type/internal-server-error";
import { NotFoundError } from "./error-type/not-found-error";
import { UnauthorizedError } from "./error-type/unauthorized-error";

export default class ErrorFactory implements IErrorFactory {
    public badRequestError(message: string, detail?: any): BadRequestError {
        return new BadRequestError(message, detail);
    }

    public unauthorizedError(message: string): UnauthorizedError {
        return new UnauthorizedError(message)
    } 

    public forbiddenError(message: string): ForbiddenError {
        return new ForbiddenError(message);
    }

    public notFoundError(message:string): NotFoundError {
        return new NotFoundError(message)
    }

    public internalServerError(message: string): InternalServerError {
        return new InternalServerError(message)
    }
}