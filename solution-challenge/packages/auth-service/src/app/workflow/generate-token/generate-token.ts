import { IErrorFactory } from "../../../interface/low-level/interface";
import { IUserRepository } from "../../../interface/low-level/user/user-repository-interface";
import { IJWTHelper, IPasswordHelper } from "../../../interface/utils/helpers/helpers-interface";
import { IValidator } from "../../../interface/utils/validator/interface";
import { GenerateTokenWorkflowInput, GenerateTokenWorkFlowOutPut } from "./types";

export default class GenerateTokenWorkflow {
    constructor (
        private errorFactory: IErrorFactory,
        private passwordHelper: IPasswordHelper,
        private userRepository: IUserRepository,
        private jwtHelper: IJWTHelper,
        private validator: IValidator
    ) {}

    public async execute(credential: GenerateTokenWorkflowInput): Promise<GenerateTokenWorkFlowOutPut> {
        try {
            await this.validator.validate(`GenerateTokenWorkflowInput`,credential)
        }
        catch (error) {
            throw this.errorFactory.badRequestError(error.message, error.details)
        }

        const user = await this.userRepository.findByEmail(credential.email)
        if (!user) {
            throw this.errorFactory.unauthorizedError(`${credential.email} is not found.`)
        }
        
        const isValidPassword = this.passwordHelper.compare(credential.password, user.password)

        if (!isValidPassword) {
            throw this.errorFactory.unauthorizedError(`Password is incorrect.`)
        }

        const token = this.jwtHelper.signIn({
            id: user.id,
            email: user.email
        })

        const isVerifiedAccount: boolean = user.status === 0 ? false : true

        // const roles = await this.roleRepository.findRolesByUserId(user.id)

        // console.log(roles)

        // console.log(roles)
        
        return { token: token, verified: isVerifiedAccount }
    }
}