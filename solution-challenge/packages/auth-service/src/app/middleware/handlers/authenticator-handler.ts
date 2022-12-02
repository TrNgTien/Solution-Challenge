import { NextFunction } from "express"
import { IErrorFactory } from "../../../interface/low-level/interface"
import { HttpRequest, HttpResponse } from "../../../interface/low-level/type"
import { IUserRepository } from "../../../interface/low-level/user/user-repository-interface"
import { IAuthenticator } from "../../../interface/middleware/interface"
export default class AuthenticatorHandler implements IAuthenticator {
    constructor (private errorFactory: IErrorFactory, private userRepository: IUserRepository) {}

    public authenticate() {
        return async (req: HttpRequest, res: HttpResponse, next: NextFunction) => {
            try {
                if (!req.appContext || !req.appContext.token) {
                    return next(this.errorFactory.unauthorizedError(`Token missing`))
                }

                next()
            }
            catch (error) {
                next(error)
            }
        }
    }
}