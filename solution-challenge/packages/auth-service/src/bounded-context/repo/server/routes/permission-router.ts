import { IRouter } from "../../../../interface/low-level/interface"
import { HttpRouter } from "../../../../interface/low-level/type"
import { IAuthenticator, IControllerHandler } from "../../../../interface/middleware/interface"

export default class PermissionRouter implements IRouter {
    private router

    constructor(controllerHandler: IControllerHandler, authenticatorHandler: IAuthenticator) {
        const router = HttpRouter()

        router.post('/create-roles', authenticatorHandler.authenticate(), controllerHandler.handle('permission', 'createRoles'))

        router.post('/create-groups', authenticatorHandler.authenticate(), controllerHandler.handle('permission', 'createGroups'))

        router.post('/create-permissions', authenticatorHandler.authenticate(), controllerHandler.handle('permission', 'createPermissions'))

        router.post('/users-add-roles', authenticatorHandler.authenticate(), controllerHandler.handle('permission', 'usersAddRoles'))

        router.post('/roles-add-groups', authenticatorHandler.authenticate(), controllerHandler.handle('permission', 'rolesAddGroups'))

        router.post('/permissions-add-groups', authenticatorHandler.authenticate(), controllerHandler.handle('permission', 'permissionsAddGroups'))

        router.post('/check-permission', authenticatorHandler.authenticate(), controllerHandler.handle('permission', 'checkPermission'))

        router.get('/find-all-permissions', authenticatorHandler.authenticate(), controllerHandler.handle('permission', 'findAllPermissions'))

        this.router = router 
    }

    public route(): HttpRouter {
        return this.router
    }
}