import { IRouter } from "../../../../interface/low-level/interface";
import { HttpRouter } from "../../../../interface/low-level/type";
import { IControllerHandler, IAuthenticator } from "../../../../interface/middleware/interface";

export default class AuthRouter implements IRouter{
    private router;

    constructor(controllerHandler: IControllerHandler, authenticatorHandler: IAuthenticator) {
        const router = HttpRouter()
        
        router.post('/get-locale/:language', controllerHandler.handle('locale', 'getLocale'))

        this.router = router
    }

    public route(): HttpRouter {
        return this.router
    }
}