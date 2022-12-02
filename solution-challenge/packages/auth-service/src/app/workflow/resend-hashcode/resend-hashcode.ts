import { Operators } from "../../../bounded-context/type";
import { HashcodeTypes } from "../../../interface/low-level/hashcode/hashcode-entity";
import { IHashcodeRepository } from "../../../interface/low-level/hashcode/hashcode-repository-interface";
import { IErrorFactory } from "../../../interface/low-level/interface";
import { IUserRepository } from "../../../interface/low-level/user/user-repository-interface";
import { IJWTHelper, IStringHelper } from "../../../interface/utils/helpers/helpers-interface";
import { HBSFiles, ISenderParser, SenderInput, SenderTypes } from "../../../interface/utils/senders/interface";
import { IValidator } from "../../../interface/utils/validator/interface";
import { ResendHashcodeWorkflowInput, ResendHashcodeWorkflowOutput } from "./type";


export default class ResendHashCodeWorkflow {
    constructor(

        private userRepository: IUserRepository,
        private hashcodeRepository: IHashcodeRepository,
        private stringHelper: IStringHelper,
        private jwtHelper: IJWTHelper,
        private senderParser: ISenderParser,
        private errorFactory: IErrorFactory,
        private validator: IValidator

    ) { }

    public async execute(credential: ResendHashcodeWorkflowInput): Promise<ResendHashcodeWorkflowOutput> {
        try {
            await this.validator.validate('ResendHashcodeWorkflowInput', credential)
        }
        catch (error) {
            throw this.errorFactory.badRequestError(error.message, error.details)
        }

        const decoded = await this.jwtHelper.verify(credential.token)

        const user = await this.userRepository.findByEmail(decoded.email)
        
        if(user.status == 1) {
            throw this.errorFactory.unauthorizedError(`This account ${user.email} is already verified.`)
        }

        const reRandomString = await this.stringHelper.genRandomString(64)
        const updatedAt = new Date()
        const expiredIn: Date = new Date(new Date().getTime() + (1000 * 60 * 60 * 3))// 3 hours

        const data = {
            key: reRandomString,
            updatedAt: updatedAt,
            expiredIn: expiredIn
        }

        // const code = await this.userRepository.findByEmail(user.email, {
        //     includes: [{field: 'hashcode', filters: [{code: 'userId', operator: Operators.Equals, value: user.id}]}]
        // })
        // console.log(`code include: `,code)

        const updateHashCode = await this.hashcodeRepository.update(data, {
            filters: [
                {
                    code: 'userId',
                    operator: Operators.Equals,
                    value: user.id
                },
                {
                    code: 'type',
                    operator: Operators.Equals,
                    value: HashcodeTypes.REGISTER_CODE
                }
            ]
        })

        const senderInput: SenderInput = {
            address: user.email,
            type: SenderTypes.Email,
            subject: `Verify your QC247 Account.`,
            attributes: {
                hashcode: reRandomString,
                expiredIn: expiredIn.toString()
            },
            template: { hbs: HBSFiles.VERIFICATION }
        }

        const sender = this.senderParser.parse(senderInput)

        await sender.execute()

        return { message: `Your verification link already sent to your email.` }
    }
}