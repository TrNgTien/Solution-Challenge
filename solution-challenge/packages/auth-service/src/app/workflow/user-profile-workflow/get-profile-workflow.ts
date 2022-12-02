import { IErrorFactory } from "../../../interface/low-level/interface";
import { IUserProfileRepository } from "../../../interface/low-level/user-profile/user-profile-repository-interface";
import { IUserRepository } from "../../../interface/low-level/user/user-repository-interface";
import { IValidator } from "../../../interface/utils/validator/interface";

import { GetProfileWorkflowInput, GetProfileWorkflowOutput } from "./type";

export default class GetProfileWorkflow {
    constructor(

        private errorFactory: IErrorFactory,
        private userRepository: IUserRepository,
        private userProfileRepository: IUserProfileRepository,
        private validator: IValidator

    ) {}

    public async execute(credential: GetProfileWorkflowInput): Promise<GetProfileWorkflowOutput> {
        try {
            await this.validator.validate(`GetProfileWorkflowInput`, credential)
        }
        catch (error) {
            throw this.errorFactory.badRequestError(error.message, error.details)
        }

        const userIDs = credential.users

        const checkUsers = userIDs.map(async userID => {
            const isExisted = await this.userRepository.findById(userID, {
                includes: [{
                    field: 'profile',
                }]
            })

            if (!isExisted) {
                throw this.errorFactory.unauthorizedError(`This userID ${userID} isn't existed.`)
            }

            return isExisted
        })

        const users = await Promise.all(checkUsers)

        console.log(`users: `,users)

        const checkProfiles = users.map(async user => {
            const isExisted = await this.userProfileRepository.findByUserId(user.id)

            if (!isExisted) {
                throw this.errorFactory.unauthorizedError(`This User ${user.email} hasn't had any profile.`)
            }

            return isExisted
        })

        const profiles = await Promise.all(checkProfiles)

        return { profiles: profiles }
        // const user = credential.user

        // const userProfile = await this.userProfileRepository.find({
        //     filters: [{
        //         code: 'userId',
        //         operator: Operators.Equals,
        //         value: user.id
        //     }]

        // })

        // if (userProfile.length === 0) {
        //     throw this.errorFactory.unauthorizedError(`This user hasn't have any profile.`)
        // }

        // //for test
        // const userIncludes = await this.userRepository.findByEmail(user.email, {
        //     includes: [{
        //         field: 'profile', filters: [{code: 'user_id', operator: Operators.Equals, value: user.id}]
        //     }]
        // })

        // console.log(`test: `,userIncludes)

        // return { profile: userProfile[0] }
    }
}