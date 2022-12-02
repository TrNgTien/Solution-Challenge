import { IErrorFactory } from "../../../interface/low-level/interface";
import { IPermissionRepository } from "../../../interface/low-level/permission/permission-repository-interface";
import { IUserRepository } from "../../../interface/low-level/user/user-repository-interface";
import { IJWTHelper } from "../../../interface/utils/helpers/helpers-interface";
import { IValidator } from "../../../interface/utils/validator/interface";
import { FindAllPermissionsWorkflowInput, FindAllPermissionsWorkflowOutput } from "./type";

export default class FindAllPermissionsWorkflow {
    constructor(

        private permissionRepository: IPermissionRepository,
        private userRepository: IUserRepository,
        private errorFactory: IErrorFactory,
        private jwtHelper: IJWTHelper,
        private validator: IValidator,

    ) {}

    public async execute(credential: FindAllPermissionsWorkflowInput): Promise<FindAllPermissionsWorkflowOutput> {
        try {
            await this.validator.validate(`FindAllPermissionsWorkflowInput`, credential)
        }
        catch (error) {
            throw this.errorFactory.badRequestError(error.message, error.details)
        }

        const user = this.jwtHelper.verify(credential.encoded)

        const checkedUser = await this.userRepository.findByEmail(user.mail)
        if (!checkedUser) {
            throw this.errorFactory.unauthorizedError(`This ${user.email} isn't existed.`)
        }

        const permissions = await this.permissionRepository.findByUserId(checkedUser.id,
            { select: ['id', 'key', 'type', 'action', 'signal'] }
        )

        return { permissions: permissions }
    }
}