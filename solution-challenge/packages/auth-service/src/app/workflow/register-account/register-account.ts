import { Operators } from "../../../bounded-context/type";
import { Hashcode, HashcodeTypes } from "../../../interface/low-level/hashcode/hashcode-entity";
import { IHashcodeRepository } from "../../../interface/low-level/hashcode/hashcode-repository-interface";
import { IErrorFactory } from "../../../interface/low-level/interface";
import { UserProfile } from "../../../interface/low-level/user-profile/user-profile-entity";
import { IUserProfileRepository } from "../../../interface/low-level/user-profile/user-profile-repository-interface";
import { User } from "../../../interface/low-level/user/user-entity";
import { IUserRepository } from "../../../interface/low-level/user/user-repository-interface";
import { IStringHelper } from "../../../interface/utils/helpers/helpers-interface";
import { HBSFiles, ISenderParser, SenderInput, SenderTypes } from "../../../interface/utils/senders/interface";
import { IValidator } from "../../../interface/utils/validator/interface";
import { RegisterAccountWorkflowInput, RegisterAccountWorkflowOutPut } from "./types";

export default class RegisterAccountWorkflow {

    constructor(

        private errorFactory: IErrorFactory,
        private userRepository: IUserRepository,
        private userProfileRepository: IUserProfileRepository,
        private stringHelper: IStringHelper,
        private senderParser: ISenderParser,
        private hashcodeRepository: IHashcodeRepository,
        private validator: IValidator
        
    ) {}

    public async execute(credential: RegisterAccountWorkflowInput): Promise<RegisterAccountWorkflowOutPut> {
        try {
            await this.validator.validate(`RegisterAccountWorkflowInput`, credential)
        }
        catch (error) {
            throw this.errorFactory.badRequestError(error.message, error.details)
        }
        
        const isExistedEmail = await this.userRepository.findByEmail(credential.email)

        if (!isExistedEmail) {
            const register = new User({
                firstName: credential.firstName,
                lastName: credential.lastName,
                email: credential.email,
                password: credential.password,
                createdAt: new Date(),
                createdBy: -1,
                updatedAt: new Date(),
                updatedBy: -1,
                status: 0
            })

            const insertRegister = await this.userRepository.create(register)

            const initialProfile = new UserProfile({
                firstName: insertRegister.firstName,
                lastName: insertRegister.lastName,
                userId: insertRegister.id
            })

            const createUserProfile = await this.userProfileRepository.create(initialProfile)

            const hashcode = await this.stringHelper.genRandomString(64) 

            const expiredIn: Date = new Date(new Date().getTime() + (1000 * 60 * 60 * 3))  //delta: 3 hours

            const verifyCode: Hashcode = new Hashcode({
                userId: insertRegister.id,
                key: hashcode,
                type: HashcodeTypes.REGISTER_CODE,
                expiredIn: expiredIn,
                createdAt: new Date(),
                createdBy: -1,
                updatedAt: new Date(),
                updatedBy: -1,
            })

            const insertCode = await this.hashcodeRepository.create(verifyCode) 

            const senderInput: SenderInput = {
                address: register.email,
                type: SenderTypes.Email,
                subject: `Verify your QC247 Account.`,
                attributes: {
                    hashcode: hashcode,
                    expiredIn: expiredIn.toString()
                },
                template: { hbs: HBSFiles.VERIFICATION }
            }

            const sender = this.senderParser.parse(senderInput)

            await sender.execute()

            return { message: `Register successfully! Please verify your account!` }

        } else throw this.errorFactory.unauthorizedError(`This ${credential.email} is already existed.`)
    }
}