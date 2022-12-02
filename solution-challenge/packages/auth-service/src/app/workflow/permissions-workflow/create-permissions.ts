import { HttpError, Operators } from "../../../bounded-context/type";
import { IGroupRepository } from "../../../interface/low-level/group/group-repository-interface";
import { IErrorFactory } from "../../../interface/low-level/interface";
import { Permission } from "../../../interface/low-level/permission/permission-entity";
import { IPermissionRepository } from "../../../interface/low-level/permission/permission-repository-interface";
import { IValidator } from "../../../interface/utils/validator/interface";
import { CreatePermissionsWorkflowInput, CreatePermissionsWorkflowOutput } from "./type";

export default class CreatePermissionsWorkflow {
    constructor(

        private groupRepository: IGroupRepository,
        private permissionRepository: IPermissionRepository,
        private errorFactory: IErrorFactory,
        private validator: IValidator

    ) {}

    public async execute(credential: CreatePermissionsWorkflowInput): Promise<CreatePermissionsWorkflowOutput> {
        try {
            await this.validator.validate(`CreatePermissionsWorkflowInput`, credential)
        }
        catch (error) {
            throw this.errorFactory.badRequestError(error.message, error.details)
        }
        const checkPermissions = credential.permissions.map(async permission => {

            const isExisted = await this.permissionRepository.findPermission(permission)
            if(isExisted.length > 0) {
                this.errorFactory.badRequestError(`This Permission ${permission} is already existed.`)
            }

            return new Permission({
                type: permission.type,
                action: permission.action,
                key: permission.key,
                signal: permission.signal
            })
        })

        const solved = await Promise.all(checkPermissions)

        const createdPermissions = solved.map(async permission => {
            const created = await this.permissionRepository.create(permission)
            
            return created
        })

        const permissions = await Promise.all(createdPermissions)

        if(credential.groups) {
            const promises = credential.groups.map(async group => {
                const isExisted = await this.groupRepository.find({
                    filters: [{
                        code: 'group_name',
                        operator: Operators.Equals,
                        value: group
                    }]
                })
                if(isExisted.length === 0) {
                    throw this.errorFactory.badRequestError(`This Group ${group} isn't existed.`)
                }
                
                return isExisted[0]
            })

            const groups = await Promise.all(promises)

            await this.permissionRepository.addGroups(permissions, groups)
        }
        
        return {message: `Create Permission successfully.`}
    }
}