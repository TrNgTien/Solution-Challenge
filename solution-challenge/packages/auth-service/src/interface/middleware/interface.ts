import { ErrorRequestHandler, HttpRequest, HttpResponse, NextFunction } from "../low-level/type";
import { ILogger } from "../utils/logger/logger-interface";

export interface IAuthenticator {
    authenticate(): (req: HttpRequest, res: HttpResponse, next: NextFunction) => any
}

export interface IControllerHandler {
    handle(controllerName: string, methodName: string): (req: HttpRequest, res: HttpResponse, next: NextFunction) => any
}

export interface IContextBinder {
    bind(): (req: HttpRequest, res: HttpResponse, next: NextFunction) => any
}

export interface IErrorHandler {
    logger: ILogger
    handle(): ErrorRequestHandler
}

export interface ITokenHandler {
    getToken(token: any): any
    handle(req: HttpRequest): string
}