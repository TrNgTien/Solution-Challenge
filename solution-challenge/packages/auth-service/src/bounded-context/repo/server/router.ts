import { Router } from "express";
import { IRouter } from "../../../interface/low-level/interface";
import { IContextBinder, IErrorHandler, ITokenHandler } from "../../../interface/middleware/interface";


export default class MainRouter implements IRouter{
    private router: Router;
    constructor(

        private errorHandler: IErrorHandler,
        private contextBinder: IContextBinder,
        private authRouter: IRouter,
        private oauthRouter: IRouter,
        private twoFactorRouter: IRouter,
        private permissionRouter: IRouter,
        private userProfileRouter: IRouter,
        private localeRouter: IRouter

        ){
        const router = Router();

        const apiRouter = Router()
        
        apiRouter.use(this.contextBinder.bind())
        
        apiRouter.use('/auth', this.authRouter.route())
        apiRouter.use('/oauth', this.oauthRouter.route())
        apiRouter.use('/two-factor', this.twoFactorRouter.route())
        apiRouter.use('/permissions', this.permissionRouter.route())
        apiRouter.use('/profile', this.userProfileRouter.route())
        apiRouter.use('/locale', this.localeRouter.route())
        
        router.use('/api', apiRouter)

        router.use(this.errorHandler.handle())

        this.router = router;
    }
    public route(): Router {
        return this.router;
      }
}