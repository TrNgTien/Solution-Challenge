import { IErrorFactory } from "../../../interface/low-level/interface";
import { IPermissionRepository } from "../../../interface/low-level/permission/permission-repository-interface";
import { IJWTHelper } from "../../../interface/utils/helpers/helpers-interface";
import { IValidator } from "../../../interface/utils/validator/interface";
import { CheckPermissionsWorkflowInput, CheckPermissionsWorkflowOutput } from "./type";

export default class CheckPermissionsWorkflow {
    constructor (

        private permissionRepository: IPermissionRepository,
        private errorFactory: IErrorFactory,
        private jwtHelper: IJWTHelper,
        private validator: IValidator

    ) {}

    public async execute(credential: CheckPermissionsWorkflowInput): Promise<CheckPermissionsWorkflowOutput> {
        try{
            await this.validator.validate(`FindPermissionsWorkflowInput`, credential)
        }
        catch (error) {
            throw this.errorFactory.badRequestError(error.message, error.details)
        }

        const action = credential.action

        const user: {[key: string]: any} = this.jwtHelper.verify(credential.encoded)

        const permissions = await this.permissionRepository.findByUserId(user.id)

        const isExisted = permissions.filter(permission => {
        
            return action.type === permission.type && action.key === permission.key && action.action === permission.action
            
        })

        return { access: isExisted.length > 0 ? true : false }
    }
}