import axios, { AxiosResponse } from "axios"
import { Operators } from "../../../../bounded-context/type"
import { IErrorFactory } from "../../../../interface/low-level/interface"
import { User } from "../../../../interface/low-level/user/user-entity"
import { IUserRepository } from "../../../../interface/low-level/user/user-repository-interface"
import { IJWTHelper } from "../../../../interface/utils/helpers/helpers-interface"
import { IFacebookOAuthRepository } from "../../../middleware/handlers/oauth-handler/facebook-oauth-handler"
import { GetOAuthTokensInput } from "../../../middleware/handlers/oauth-handler/type"
import { GetFacebookTokenWorkflowInput, GetFacebookTokenWorkflowOutput, OAuthAccountTypes } from "./type"

export type FacebookUserAttributes = {
    id: string,
    email: string,
    first_name: string,
    last_name: string,
    gender: string,
    picture: {
        data: {
            height: number,
            witdth: number,
            is_silhouette: boolean,
            url: string,
        }
    }
}

export default class GetFacebookTokenWorkflow {
    constructor(

        private userRepository: IUserRepository,
        private errorFactory: IErrorFactory,
        private facebookOauthHandler: IFacebookOAuthRepository,
        private jwtHelper: IJWTHelper

    ) {}

    public async execute(credential: GetFacebookTokenWorkflowInput): Promise<GetFacebookTokenWorkflowOutput> {
        const input: GetOAuthTokensInput = {
            code: credential.code
        }

        let token: string

        const verifiedtoken = await this.facebookOauthHandler.getOAuthToken(input)

        const facebookUser = await this.facebookOauthHandler.getUserData(verifiedtoken)

        console.log(facebookUser)

        const isExistedUser = await this.userRepository.findByEmail(facebookUser.email)

        const isExisted = await this.userRepository.find({
            filters: [{
                code: 'uuid',
                operator: Operators.Equals,
                value: facebookUser.id
            }]
        })

        if(isExisted.length && isExisted[0].email !== isExistedUser.email) {
            throw this.errorFactory.unauthorizedError(`This Email ${facebookUser.email} in Facebook User is already existed.`)
        }

        if (isExisted.length === 0) {
            if(isExistedUser && isExistedUser.email === facebookUser.email) {
                
                const updateduser = await this.userRepository.update({uuid: facebookUser.id}, {
                    filters: [{code: 'id', operator: Operators.Equals, value: isExistedUser.id}]
                })

                token = await this.jwtHelper.signIn({
                    id: updateduser.id,
                    email: updateduser.email
                })
    
                return { message: `Signin account successfully.`, token: token }
            }

            const register = new User({
                firstName: facebookUser.first_name,
                lastName: facebookUser.last_name,
                email: facebookUser.email,
                status: 0,
                accountType: OAuthAccountTypes.Facebook,
                uuid: facebookUser.id,
                createdAt: new Date(),
                createdBy: -1,
                updatedAt: new Date(),
                updatedBy: -1,
            })

            const user = await this.userRepository.create(register)

            token = await this.jwtHelper.signIn({
                id: user.id,
                email: user.email
            })

            return { message: `Register account successfully.`, user: user, token: token }
        }

        token = await this.jwtHelper.signIn({
            id: isExisted[0].id,
            email: isExisted[0].email
        }) 
        
        return { message: `Signin account successfully.`, user: isExisted[0], token: token }
    }
}