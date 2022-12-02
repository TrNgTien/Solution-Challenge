import { NextFunction } from "express";
import { HttpRequest, HttpResponse, ControllerResult } from "../../../interface/low-level/type";
import { IControllerHandler, IErrorHandler } from "../../../interface/middleware/interface";

export default class ControllorHandler implements IControllerHandler {
    constructor (errorHandler: IErrorHandler) {}

    public handle(controllerName: string, methodName: string) {
        return async (req: HttpRequest, res: HttpResponse, next: NextFunction) => {
            const transaction = req.appContext.transaction

            try {
                const controller = req.container.resolve(`${controllerName}Controller`)
                const result: ControllerResult = await controller[methodName](req)

                if (transaction) { transaction.commit() }

                return res.status(result.httpCode || 200).json(result.content)
            }
            catch (error) {
                if (transaction) { transaction.rollback() }
                next(error)
            }
        }
    }
}