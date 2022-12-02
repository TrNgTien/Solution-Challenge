import { ErrorRequestHandler, NextFunction } from "express";
import { IErrorFactory, IHttpError } from "../../../interface/low-level/interface";
import { HttpRequest, HttpResponse } from "../../../interface/low-level/type";
import { IErrorHandler } from "../../../interface/middleware/interface";
import { ILogger, ILoggerFactory } from "../../../interface/utils/logger/logger-interface";

export default class ErrorHandler implements IErrorHandler {
    public logger: ILogger

    constructor(private loggerFactory: ILoggerFactory, private errorFactory: IErrorFactory) { }

    public handle(): ErrorRequestHandler {
        return (error: IHttpError, req: HttpRequest, res: HttpResponse, next: NextFunction) => {
            this.logger = this.loggerFactory.logError()

            if (!error.status) {
                console.log(error)
                error = this.errorFactory.internalServerError(error.message);
            }

            const message: { error: string, detail?: any } = {
                error: error.message
            }

            if (error.details) { message.detail = error.details }

            this.logger.log(req, res)
            
            return res.status(error.status).json(message)
        }
    }
    // execute(error: IHttpError, req: Request, res: Response, next: NextFunction) {
    //     this.logger = this.loggerFactory.logError()
    //     console.log(error)
    //     this.logger.log(req, res, next)

}
