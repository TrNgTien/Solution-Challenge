import { Operators } from "../../../bounded-context/type";
import { Hashcode, HashcodeTypes, IHashcodeAtrributes } from "../../../interface/low-level/hashcode/hashcode-entity";
import { IHashcodeRepository } from "../../../interface/low-level/hashcode/hashcode-repository-interface";
import { IErrorFactory } from "../../../interface/low-level/interface";
import { IUserRepository } from "../../../interface/low-level/user/user-repository-interface";
import { IStringHelper } from "../../../interface/utils/helpers/helpers-interface";
import { HBSFiles, ISenderParser, SenderInput, SenderTypes } from "../../../interface/utils/senders/interface";
import { IValidator } from "../../../interface/utils/validator/interface";
import { RecoverPasswordWorkflowInput, RecoverPasswordWorkflowOutput } from "./types";

export default class RecoverPasswordWorkflow {
    constructor(

        private stringHelper: IStringHelper,
        private errorFactory: IErrorFactory,
        private validator: IValidator,
        private hashcodeRepository: IHashcodeRepository,
        private userRepository: IUserRepository,
        private senderParser: ISenderParser

    ) { }

    public async execute(credential: RecoverPasswordWorkflowInput): Promise<RecoverPasswordWorkflowOutput> {
        try {
            await this.validator.validate(`RecoverPasswordWorkflowInput`, credential)
        }
        catch (error) {
            throw this.errorFactory.badRequestError(error.message, error.details)
        }

        const userEmail = credential.metadata.email.value

        const user = await this.userRepository.findByEmail(userEmail)

        console.log(user)

        if (!user) {
            return { message: 'Your Recover-Account Link is already sent to your email.' }
        }

        const randomString = await this.stringHelper.genRandomString(64)
        const expiredIn = new Date(new Date().getTime() + (1000 * 60 * 60 * 3)) // 3 hours

        const existedHashcode = await this.hashcodeRepository.find({
            filters: [
                {
                    code: 'userId',
                    operator: Operators.Equals,
                    value: user.id
                },
                {
                    code: 'type',
                    operator: Operators.Equals,
                    value: HashcodeTypes.RECOVER_CODE
                }
            ]
        })

        if (existedHashcode.length === 0) {
            const data = new Hashcode({
                userId: user.id,
                key: randomString,
                type: HashcodeTypes.RECOVER_CODE,
                expiredIn: expiredIn,
                createdAt: new Date(),
                updatedAt: new Date()
            })

            await this.hashcodeRepository.create(data)
        } else {

            await this.hashcodeRepository.update({ key: randomString }, {
                filters: [
                    {
                        code: 'id',
                        operator: Operators.Equals,
                        value: existedHashcode[0].id
                    },
                    {
                        code: 'type',
                        operator: Operators.Equals,
                        value: HashcodeTypes.RECOVER_CODE
                    }
                ]
            })
        }

        const senderInput: SenderInput = {
            address: userEmail,
            type: SenderTypes.Email,
            subject: `Recover Quikchek247 Account.`,
            attributes: {
                hashcode: randomString,
                expiredIn: expiredIn.toString()
            },
            template: { hbs: HBSFiles.RECOVER_ACCOUNT }
        }

        const sender = this.senderParser.parse(senderInput)

        await sender.execute()

        return { message: 'Your Recover-Account Link is already sent to your email.' }
    }
}