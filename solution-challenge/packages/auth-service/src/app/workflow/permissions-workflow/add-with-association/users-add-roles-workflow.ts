import { IErrorFactory } from "../../../../interface/low-level/interface";
import { IRoleRepository } from "../../../../interface/low-level/role/role-repository-interface";
import { IUserRepository } from "../../../../interface/low-level/user/user-repository-interface";
import { IValidator } from "../../../../interface/utils/validator/interface";
import { UsersAddRolesWorkflowInput, UsersAddRolesWorkflowOutput } from "./type";


export default class UsersAddRolesWorkflow {
    constructor(

        private userRepository: IUserRepository,
        private roleRepository: IRoleRepository,
        private errorFactory: IErrorFactory,
        private validator: IValidator

    ) {}

    public async execute(credential: UsersAddRolesWorkflowInput): Promise<UsersAddRolesWorkflowOutput> {
        try {
            await this.validator.validate(`UsersAddRolesWorkflowInput`, credential)
        }
        catch (error) {
            throw this.errorFactory.badRequestError(error.message, error.details)
        }

        const rolesList = credential.roles.map(async roleID => {
            const isExisted = await this.roleRepository.findById(roleID)

            if(!isExisted) {
                throw this.errorFactory.badRequestError(`This userID ${roleID} isn't existed.`)
            }
            
            return isExisted
        })

        const roles = await Promise.all(rolesList)
        
        const usersList = credential.users.map(async userID => {
            const isExisted = await this.userRepository.findById(userID, {
                includes: [{field: 'roles'}]
            })

            if(!isExisted) {
                throw this.errorFactory.badRequestError(`This userID ${userID} isn't existed.`)
            }

            return isExisted
        })

        const users = await Promise.all(usersList)

        await this.userRepository.addRoles(users, roles)

        return { message: `add roles for users successfully` }
    }
}