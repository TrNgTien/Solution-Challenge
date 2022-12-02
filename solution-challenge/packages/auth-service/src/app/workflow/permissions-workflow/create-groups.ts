import { Operators } from "../../../bounded-context/type";
import { Group } from "../../../interface/low-level/group/group-entity";
import { IGroupRepository } from "../../../interface/low-level/group/group-repository-interface";
import { IErrorFactory } from "../../../interface/low-level/interface";
import { IValidator } from "../../../interface/utils/validator/interface";
import { CreateGroupsWorkflowInput, CreateGroupsWorkflowOutput } from "./type";


export default class CreateGroupWorkflow {
    constructor(

        private groupRepository: IGroupRepository,
        private errorFactory: IErrorFactory,
        private validator: IValidator,
    ) {}

    public async execute(credential: CreateGroupsWorkflowInput): Promise<CreateGroupsWorkflowOutput> {
        try {
            await this.validator.validate(`CreateGroupsWorkflowInput`, credential)
        }
        catch (error) {
            throw this.errorFactory.badRequestError(error.message, error.details)
        }
        const groups = credential.groups.map(async group => {
            const isExisted = await this.groupRepository.find({
                filters: [{
                    code: 'group_name',
                    operator: Operators.Equals,
                    value: group
                }]
            })

            if(isExisted.length > 0) {
                throw this.errorFactory.badRequestError(`This ${group} is already existed.`)
            }

            return new Group({
                name: group
            })
        })

        const solved = await Promise.all(groups)

        const createdGroups = solved.map(async group => {
            const created = this.groupRepository.create(group)
            
            return created
        })

        const test = await Promise.all(createdGroups)

        return { message: `Created groups successfully.` }
    }
}