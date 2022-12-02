import { IRouter } from "../../../../interface/low-level/interface"
import { HttpRouter } from "../../../../interface/low-level/type"
import { IControllerHandler, IAuthenticator } from "../../../../interface/middleware/interface"

export default class TwoFactorRouter implements IRouter {
    private router

    constructor(controllerHandler: IControllerHandler, authenticatorHandler: IAuthenticator) {
        const router = HttpRouter()
        
        router.get('/verify/:hashcode', controllerHandler.handle('twoFactor', 'verifyAccount'))
        router.post('/resend', authenticatorHandler.authenticate(), controllerHandler.handle('twoFactor', 'resendHashcode'))

        this.router = router
    }

    public route(): HttpRouter {
        return this.router
    }
}