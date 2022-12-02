import { Operators } from "../../../bounded-context/type";
import { HashcodeTypes } from "../../../interface/low-level/hashcode/hashcode-entity";
import { IHashcodeRepository } from "../../../interface/low-level/hashcode/hashcode-repository-interface";
import { IErrorFactory } from "../../../interface/low-level/interface";
import { User } from "../../../interface/low-level/user/user-entity";
import { IUserRepository } from "../../../interface/low-level/user/user-repository-interface";
import { IValidator } from "../../../interface/utils/validator/interface";
import { ChangingPasswordWorkflowInput, ChangingPasswordWorkflowOutput } from "./types";

export default class ChangingPasswordWorkflow {
    constructor(

        private errorFactory: IErrorFactory,
        private validator: IValidator,
        private hashcodeRepository: IHashcodeRepository,
        private userRepository: IUserRepository,

    ) { }

    public async execute(credential: ChangingPasswordWorkflowInput): Promise<ChangingPasswordWorkflowOutput> {
        console.log(`credential: `, credential)
        
        try {
            await this.validator.validate(`ChangingPasswordWorkflowInput`, credential)
        }
        catch (error) {
            throw this.errorFactory.badRequestError(error.message, error.details)
        }

        const { hashcode, password } = {

            hashcode: credential.hashcode,
            password: credential.password

        };
        

        const existedHashcode = await this.hashcodeRepository.find({
            filters: [
                { 
                    code: 'key', 
                    operator: Operators.Equals, 
                    value: hashcode
                },
                {
                    code: 'type',
                    operator: Operators.Equals,
                    value: HashcodeTypes.RECOVER_CODE
                }   
            ],
        });

        console.log(existedHashcode)

        if (existedHashcode.length === 0) {
            throw this.errorFactory.unauthorizedError(`Undefined Hashcode.`)
        };

        const user = await this.userRepository.findById(existedHashcode[0].userId)

        if(!user) {
            throw this.errorFactory.unauthorizedError(`invalid Email`)
        }

        if (existedHashcode[0].key !== hashcode) {
            throw this.errorFactory.unauthorizedError(`Invalid Hashcode.`)
        }

        const isExpired = (new Date(existedHashcode[0].expiredIn).getTime() < new Date().getTime())
        if (isExpired) {
            throw this.errorFactory.unauthorizedError(`This Hashcode is expired.`)
        }

        const updateUser = new User({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            profile: user.profile,
            password: password,
            roles: user.roles,
            
            status: user.status,
            accountType: user.accountType,
            createdAt: user.createdAt,
            updatedAt: new Date(Date.now())
        })

        await this.userRepository.update(updateUser, {
            filters: [
                {
                    code: 'id',
                    operator: Operators.Equals,
                    value: user.id
                }
            ]
        })

        return { message: `Recover Account successfully` }
    }
}