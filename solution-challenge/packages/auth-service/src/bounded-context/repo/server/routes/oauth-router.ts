import { IRouter } from "../../../../interface/low-level/interface";
import { HttpRouter } from "../../../../interface/low-level/type";
import { IAuthenticator, IControllerHandler } from "../../../../interface/middleware/interface";

export default class OAuthRouter implements IRouter {
    private router

    constructor(controllerHandler: IControllerHandler, authenticatorHandler: IAuthenticator) {
        const router = HttpRouter()
        
        router.get('/google/redirect', controllerHandler.handle('oauth', 'redirectGoogletUri'))
        router.get('/google/url', controllerHandler.handle('oauth', 'getGoogleToken'))

        router.get('/facebook/redirect', controllerHandler.handle('oauth', 'redirectFacebookUri'))
        router.get('/facebook/url', controllerHandler.handle('oauth', 'getFacebookToken'))

        this.router = router
    }

    public route(): HttpRouter {
        return this.router
    }
}