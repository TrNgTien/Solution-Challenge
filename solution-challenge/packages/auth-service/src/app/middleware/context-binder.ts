import { asValue } from "awilix";
import { NextFunction } from "express";
import { AppContext, Operators } from "../../bounded-context/type";
import { IDatabase, IErrorFactory } from "../../interface/low-level/interface";
import { HttpRequest, HttpResponse } from "../../interface/low-level/type";
import { User } from "../../interface/low-level/user/user-entity";
import { IUserRepository } from "../../interface/low-level/user/user-repository-interface";
import { IContextBinder, ITokenHandler } from "../../interface/middleware/interface";
import { IJWTHelper } from "../../interface/utils/helpers/helpers-interface";
export default class ContextBinder implements IContextBinder {


    constructor(

        private jwtHelper: IJWTHelper, 
        private db: IDatabase, 
        private errorFactory: IErrorFactory, 
        private tokenHandler: ITokenHandler,
        private userRepository: IUserRepository

        ) {}

    public bind() {
        return async (req: HttpRequest, res: HttpResponse, next: NextFunction) => {
            try {
                let transaction = null

                if (req.method !== 'GET') {
                    transaction = await this.db.getTransaction()
                }

                let user: User = null

                const token = this.tokenHandler.handle(req)
                let tokenData: any
                if (token) {
                    try {
                        tokenData = this.jwtHelper.verify(token)
                    }
                    catch (error) {
                        throw this.errorFactory.badRequestError(`Token Invalid: ${token}`)
                    }

                    if (!tokenData) {
                        throw this.errorFactory.badRequestError(`Token is expired.`)
                    }

                    const users = await this.userRepository.find({
                        filters: [
                            {
                                code: 'user_id',
                                operator: Operators.Equals,
                                value: tokenData.id
                            }
                        ]
                    })

                    if (users.length !== 0) { user = users[0] }
                }
                

                let appContext: AppContext = {
                    user: user,
                    token: token,
                    transaction: transaction
                }

                req.container.register({
                    appContext: asValue(appContext)
                })

                req.appContext = appContext

                next();
            }
            catch (error) {
                next(error)
            }
        }
    }
}

