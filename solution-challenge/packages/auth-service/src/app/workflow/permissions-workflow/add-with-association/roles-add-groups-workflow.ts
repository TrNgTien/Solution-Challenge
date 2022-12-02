import { IGroupRepository } from "../../../../interface/low-level/group/group-repository-interface";
import { IErrorFactory } from "../../../../interface/low-level/interface";
import { IRoleRepository } from "../../../../interface/low-level/role/role-repository-interface";
import { IValidator } from "../../../../interface/utils/validator/interface";
import { RolesAddGroupsWorkflowInput, RolesAddGroupsWorkflowOutput } from "./type";

export default class RolesAddGroupsWorkflow {
    constructor(

        private roleRepository: IRoleRepository,
        private groupRepository: IGroupRepository,
        private errorFactory: IErrorFactory,
        private validator: IValidator,

    ) {}

    public async execute(credential: RolesAddGroupsWorkflowInput): Promise<RolesAddGroupsWorkflowOutput> {
        try {
            console.log(credential.groups)
            await this.validator.validate(`RolesAddGroupsWorkflowInput`, credential)
        }
        catch (error) {
            console.log(`pass here`,error)
            throw this.errorFactory.badRequestError(error.message, error.details)
        }
        console.log(credential.groups)
        const rolesList = credential.roles.map(async role => {
            const isExisted = await this.roleRepository.findById(role)
            if(!isExisted) {
                throw this.errorFactory.badRequestError(`This roleID ${role} isn't existed.`)
            }

            return isExisted
        })

        const roles = await Promise.all(rolesList)
        console.log(credential.groups)

        const groupsList = credential.groups.map(async group => {
            const isExisted = await this.groupRepository.findById(group)
            if(!isExisted) {
                throw this.errorFactory.badRequestError(`This groupID ${group} isn't existed`)
            }

            return isExisted
        })

        const groups = await Promise.all(groupsList)

        await this.roleRepository.addGroups(roles, groups)

        return { message: "add groups for roles successfully" }
    }
}