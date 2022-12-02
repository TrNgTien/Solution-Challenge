import { User } from "../../../../interface/low-level/user/user-entity";
import { IUserRepository } from "../../../../interface/low-level/user/user-repository-interface";
import { IJWTHelper } from "../../../../interface/utils/helpers/helpers-interface";
import { IGoogleOAuthRepository } from "../../../middleware/handlers/oauth-handler/google-oauth-handler";
import { GetOAuthTokensInput } from "../../../middleware/handlers/oauth-handler/type";
import { getGoogleTokenWorkflowInput, getGoogleTokenWorkflowOutput } from "./type";

export default class GetGoogleTokenWorkflow {
    constructor(

        private userRepository: IUserRepository,
        private jwtHelper: IJWTHelper,
        private googleOauthHandler: IGoogleOAuthRepository

    ) {}

    public async execute(credential: getGoogleTokenWorkflowInput): Promise<getGoogleTokenWorkflowOutput> {
        const input: GetOAuthTokensInput = {
            code: credential.code,
        }
        const verifiedtoken = await this.googleOauthHandler.getOAuthToken(input)

        const googleUser = await this.googleOauthHandler.getUserData(verifiedtoken)

        const isExistedUser = await this.userRepository.findByEmail(googleUser.email)
        
        let token: string

        if (!isExistedUser) {
            const register = new User({
                firstName: googleUser.given_name,
                lastName: googleUser.family_name,
                email: googleUser.email,
                createdAt: new Date(),
                createdBy: -1,
                updatedAt: new Date(),
                updatedBy: -1,
                status: 1
            })

            const user = await this.userRepository.create(register)

            token = await this.jwtHelper.signIn({
                id: user.id,
                email: user.email
            })

            return { message: `Register account successfully.`, user: user, token: token }

        }

        token = await this.jwtHelper.signIn({
            id: isExistedUser.id,
            email: isExistedUser.email
        }) 
        
        return { message: `signin account successfully.`, user: isExistedUser, token: token }
    }
}