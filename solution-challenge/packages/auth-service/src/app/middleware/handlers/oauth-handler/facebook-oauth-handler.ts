import axios, { AxiosResponse } from "axios"
import { 
    FACEBOOK_APP_ID, 
    FACEBOOK_APP_SECRET, 
    FACEBOOK_GET_TOKEN_URI, 
    FACEBOOK_GET_USER_URI, 
    FACEBOOK_REDIRECT_URI, 
    FACEBOOK_ROOT_URL 
} from "../../../workflow/oauth/facebook/type"
import { BaseOAuthHandler } from "./base-oauth-handler"
import { IOAuth, IOAuthData, IOAuthRepository, OAuthToken, RequestTypes } from "./type"

export interface FacebookOAuthConfig extends IOAuth {}

export interface FacebookUserData extends IOAuthData {
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

export interface IFacebookOAuthRepository extends IOAuthRepository<FacebookUserData> {
    getUserData(token: OAuthToken): Promise<FacebookUserData>
}

export default class FacebookOAuthHandler extends BaseOAuthHandler<FacebookOAuthConfig, FacebookUserData> implements IFacebookOAuthRepository {

    constructor() {
        super()

        this.scope = ['email', 'user_friends','public_profile', 'user_birthday', 'user_gender', 'user_hometown']


        this.config = {
            root_url: FACEBOOK_ROOT_URL,
            app_id: FACEBOOK_APP_ID,
            secret_key: FACEBOOK_APP_SECRET,
            method: RequestTypes.GET,
            redirect_uri: FACEBOOK_REDIRECT_URI,
            get_token_uri: FACEBOOK_GET_TOKEN_URI,
            get_user_uri: FACEBOOK_GET_USER_URI
        }

        this.options = {
            client_id: this.config.app_id,
            redirect_uri: this.config.redirect_uri,
            scope: this.scope.join(','),
            response_type: 'code',
            auth_type: 'rerequest'
        }

    }

    public async getUserData(token: OAuthToken): Promise<FacebookUserData> {
        const getUserUri = this.config.get_user_uri

        let user: AxiosResponse
        try {
            user = await axios(getUserUri, { 
                method: 'GET',
                params: {
                    fields: ['id', 'email', 'first_name', 'last_name', 'picture', 'gender'].join(','),
                    access_token: token.access_token
                }
            })
        }
        catch (error) {
            throw this.errorFactory.badRequestError(`Request to OAuth Server has something wrong when trying to get User Data.`, error.details)

        }

        return user.data
    }
}