import { Operators } from "../../../bounded-context/type";
import { IGroupRepository } from "../../../interface/low-level/group/group-repository-interface";
import { IErrorFactory } from "../../../interface/low-level/interface";
import { Role } from "../../../interface/low-level/role/role-entity";
import { IRoleRepository } from "../../../interface/low-level/role/role-repository-interface";
import { IValidator } from "../../../interface/utils/validator/interface";
import { CreateRolesWorkflowInput, CreateRolesWorkflowOutput } from "./type";

export default class CreateRolesWorkflow {
    constructor(

        private roleRepository: IRoleRepository,
        private errorFactory: IErrorFactory,
        private groupRepository: IGroupRepository,
        private validator: IValidator

    ) { }

    public async execute(credential: CreateRolesWorkflowInput): Promise<CreateRolesWorkflowOutput> {
        try {
            await this.validator.validate(`CreateRolesWorkflowInput`, credential)
        }
        catch (error) {
            throw this.errorFactory.badRequestError(error.message, error.details)
        }
        const checkRoles = credential.roles.map(async role => {
            const isExisted = await this.roleRepository.find({
                filters: [{
                    code: 'role_name',
                    operator: Operators.Equals,
                    value: role
                }]
            })
            if (isExisted.length > 0) {
                throw this.errorFactory.badRequestError(`This role ${role} is already existed`)
            }

            return new Role({ 
                name: role
            })
        })

        const solved = await Promise.all(checkRoles)

        const createdRoles = solved.map(async role => {
            const created = await this.roleRepository.create(role)

            return created
        })

        const roles = await Promise.all(createdRoles)

        console.log(roles)
        
        if(credential.group) {
            const promises = credential.group.map(async group => {
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

            console.log(groups)

            await this.roleRepository.addGroups(roles, groups)
            console.log(`pass here`)
        }

        return { message: `insert roles successfully` }
    }
}