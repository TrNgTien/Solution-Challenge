import { IRouter } from "../../../../interface/low-level/interface";
import { HttpRouter } from "../../../../interface/low-level/type";
import { IControllerHandler, IAuthenticator } from "../../../../interface/middleware/interface";

export default class AuthRouter implements IRouter{
    private router;

    constructor(controllerHandler: IControllerHandler, authenticatorHandler: IAuthenticator) {
        const router = HttpRouter()
        
        router.post('/signin', controllerHandler.handle('auth', 'generateToken'))
        router.post('/signup', controllerHandler.handle('auth', 'registerAccount'))

        router.post('/recover-password', controllerHandler.handle('auth', 'recoverPassword'))
        router.post('/recover/:hashcode', controllerHandler.handle('auth', 'changingPassword'))
        
        this.router = router
    }

    public route(): HttpRouter {
        return this.router
    }


}