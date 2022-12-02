import { IGroupRepository } from "../../../../interface/low-level/group/group-repository-interface";
import { IErrorFactory } from "../../../../interface/low-level/interface";
import { IPermissionRepository } from "../../../../interface/low-level/permission/permission-repository-interface";
import { IValidator } from "../../../../interface/utils/validator/interface";
import { PermissionsAddGroupsWorkflowInput, PermissionsAddGroupsWorkflowOutput } from "./type";

export default class PermissionsAddGroupsWorkflow {
    constructor(

        private permissionRepository: IPermissionRepository,
        private groupRepository: IGroupRepository,
        private errorFactory: IErrorFactory,
        private validator: IValidator

    ) {}

    public async execute(credential: PermissionsAddGroupsWorkflowInput): Promise<PermissionsAddGroupsWorkflowOutput> {
        try {
            await this.validator.validate(`PermissionsAddGroupsWorkflowInput`, credential)
        }
        catch (error) {
            throw this.errorFactory.badRequestError(error.message, error.details)
        }

        const permissionsList = credential.permissions.map(async permission => {
            const isExisted = await this.permissionRepository.findById(permission)

            if(!isExisted) {
                throw this.errorFactory.unauthorizedError(`This permissionID ${permission} isn't existed.`)
            }

            return isExisted
        })

        const permissions = await Promise.all(permissionsList)

        const groupsList = credential.groups.map(async group => {
            const isExisted = await this.groupRepository.findById(group)

            if(!isExisted) {
                throw this.errorFactory.unauthorizedError(`This groupID ${group} isn't existed.`)
            }

            return isExisted
        })

        const groups = await Promise.all(groupsList)

        await this.permissionRepository.addGroups(permissions, groups)
        
        return { message: `permissions add groups successfully.` }
    }
}