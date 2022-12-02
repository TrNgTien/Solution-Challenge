import { Operators } from "../../../bounded-context/type";
import { IErrorFactory } from "../../../interface/low-level/interface";
import { UserProfile } from "../../../interface/low-level/user-profile/user-profile-entity";
import { IUserProfileRepository } from "../../../interface/low-level/user-profile/user-profile-repository-interface";
import { IUserRepository } from "../../../interface/low-level/user/user-repository-interface";
import { IValidator } from "../../../interface/utils/validator/interface";
import { UpdateProfileWorkflowInput, UpdateProfileWorkflowOutput } from "./type";

export default class UpdateProfileWorkflow {
    constructor (

        private errorFactory: IErrorFactory,
        private userRepository: IUserRepository,
        private userProfileRepository: IUserProfileRepository,
        private validator: IValidator

    ) {}

    public async execute(credential: UpdateProfileWorkflowInput): Promise<UpdateProfileWorkflowOutput> {
        try{
            await this.validator.validate(`UpdateProfileWorkflowInput`, credential)
        }
        catch (error) {
            throw this.errorFactory.badRequestError(error.message, error.details)
        }

        const userID = credential.userId
        

        const isExsitedUser = await this.userRepository.findById(userID)

        if(!isExsitedUser) {
            throw this.errorFactory.unauthorizedError(`This userID ${userID} is not existed.`)
        }

        const isExistedProfile = await this.userProfileRepository.findByUserId(userID)

        console.log(isExistedProfile)

        if(!isExistedProfile) {
            throw this.errorFactory.unauthorizedError(`This userID ${userID} hasn't had any profile.`)
        }
        
        const updateProfile = new UserProfile(credential)

        console.log(updateProfile)

         const updated = await this.userProfileRepository.update(updateProfile, {
             filters: [{
                 code: 'id',
                 operator: Operators.Equals,
                 value: isExistedProfile.id
             }]
         })

        return { message: `Update profile of UserID ${userID} successfully.` }
    }
}