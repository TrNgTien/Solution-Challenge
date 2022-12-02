import { AppContext } from "../../bounded-context/type";
import { IPermissionController } from "../../interface/controller/interface";
import { ControllerResult, HttpRequest } from "../../interface/low-level/type";
import CheckPermissionsWorkflow from "../workflow/permissions-workflow/check-permission";
import CreateGroupWorkflow from "../workflow/permissions-workflow/create-groups";
import CreatePermissionsWorkflow from "../workflow/permissions-workflow/create-permissions";
import CreateRolesWorkflow from "../workflow/permissions-workflow/create-roles";
import RolesAddGroupsWorkflow from "../workflow/permissions-workflow/add-with-association/roles-add-groups-workflow";
import UsersAddRolesWorkflow from "../workflow/permissions-workflow/add-with-association/users-add-roles-workflow";
import PermissionsAddGroupsWorkflow from "../workflow/permissions-workflow/add-with-association/permissions-add-groups-workflow";
import FindAllPermissionsWorkflow from "../workflow/permissions-workflow/find-all-permissions";

export default class PermissionController implements IPermissionController {
    constructor(appContext: AppContext) {}

    public async createRoles(req: HttpRequest): Promise<ControllerResult> {
        const result = await req.container.resolve<CreateRolesWorkflow>(`createRoles`).execute(req.body)
        
        return { content: result }
    }
    
    public async createGroups(req: HttpRequest): Promise<ControllerResult> {
        const result = await req.container.resolve<CreateGroupWorkflow>(`createGroups`).execute(req.body)

        return { content: result }
    }

    public async createPermissions(req: HttpRequest): Promise<ControllerResult> {
        const result = await req.container.resolve<CreatePermissionsWorkflow>(`createPermissions`).execute(req.body)

        return { content: result }
    }

    public async checkPermission(req: HttpRequest): Promise<ControllerResult> {
        const result = await req.container.resolve<CheckPermissionsWorkflow>(`checkPermission`).execute({encoded: req.appContext.token, action: req.body})

        return { content: result }
    }

    public async findAllPermissions(req: HttpRequest): Promise<ControllerResult> {
        const result = await req.container.resolve<FindAllPermissionsWorkflow>(`findAllPermissions`).execute({ encoded: req.appContext.token })

        return { content: result }
    }

    public async usersAddRoles(req: HttpRequest): Promise<ControllerResult> {
        const result = await req.container.resolve<UsersAddRolesWorkflow>(`usersAddRolesWorkflow`).execute(req.body)

        return { content: result }
    }

    public async rolesAddGroups(req: HttpRequest): Promise<ControllerResult> {
        const result = await req.container.resolve<RolesAddGroupsWorkflow>(`rolesAddGroupsWorkflow`).execute(req.body)

        return { content: result }
    }

    public async permissionsAddGroups(req: HttpRequest): Promise<ControllerResult> {
        const result = await req.container.resolve<PermissionsAddGroupsWorkflow>(`permissionsAddGroupsWorkflow`).execute(req.body)

        return { content: result }
    }


}