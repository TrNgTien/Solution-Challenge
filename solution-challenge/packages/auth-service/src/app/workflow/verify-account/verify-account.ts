import { Operators } from "../../../bounded-context/type";
import { HashcodeTypes } from "../../../interface/low-level/hashcode/hashcode-entity";
import { IHashcodeRepository } from "../../../interface/low-level/hashcode/hashcode-repository-interface";
import { IErrorFactory } from "../../../interface/low-level/interface";
import { IUserRepository } from "../../../interface/low-level/user/user-repository-interface";
import { IValidator } from "../../../interface/utils/validator/interface";
import { VerifyAccountWorkflowInput, VerifyAccountWorkflowOutput } from "./type";

export default class VerifyAccountWorkflow {
    constructor(

        private errorFactory: IErrorFactory,
        private userRepository: IUserRepository,
        private hashcodeRepository: IHashcodeRepository,
        private validator: IValidator

    ) { }

    public async execute(credential: VerifyAccountWorkflowInput): Promise<VerifyAccountWorkflowOutput> {
        try {
            await this.validator.validate('VerifyAccountWorkflowInput', credential)
        }
        catch (error) {
            this.errorFactory.badRequestError(error.message, error.details)
        }

        const findingCode = await this.hashcodeRepository.find({
            filters: [
                {
                    code: 'key',
                    operator: Operators.Equals,
                    value: credential.hashcode
                },
                {
                    code: 'type',
                    operator: Operators.Equals,
                    value: HashcodeTypes.REGISTER_CODE
                }
            ]
        })

        if (findingCode.length === 0) {
            throw this.errorFactory.badRequestError('Wrong verification URL.')
        }

        const isExpired = (new Date(findingCode[0].expiredIn).getTime() < new Date().getTime())

        if (isExpired) {
            throw this.errorFactory.unauthorizedError(`This Verification Link is already expired.`)
        }

        const updateStatusAccount = await this.userRepository.update({ status: 1 }, {
            filters: [
                {
                    code: 'id',
                    operator: Operators.Equals,
                    value: findingCode[0].id
                },
            ]
        })

        return { message: `verify account successfully` }
    }
}