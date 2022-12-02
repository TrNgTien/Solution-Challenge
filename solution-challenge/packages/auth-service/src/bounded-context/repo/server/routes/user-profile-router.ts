
import ControllorHandler from "../../../../app/middleware/handlers/controller-handler";
import { IRouter } from "../../../../interface/low-level/interface";
import { HttpRouter } from "../../../../interface/low-level/type";
import { IAuthenticator } from "../../../../interface/middleware/interface";

export default class UserProfileRouter implements IRouter {
    private router;

    constructor(controllerHandler: ControllorHandler, authenticatorHandler: IAuthenticator) {
        const router = HttpRouter()

        router.get('/get-user-profile', controllerHandler.handle(`userProfile`, `getProfile`))

        router.post('/update-user-profile', authenticatorHandler.authenticate(), controllerHandler.handle(`userProfile`, 'updateProfile'))
        
        this.router = router
    }

    public route(): HttpRouter {
        return this.router
    }
}