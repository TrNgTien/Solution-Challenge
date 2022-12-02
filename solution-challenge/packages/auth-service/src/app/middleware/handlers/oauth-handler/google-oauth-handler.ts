import axios, { AxiosResponse } from "axios";
import {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_GET_TOKEN_URI,
    GOOGLE_GET_USER_URI,
    GOOGLE_REDIRECT_URI,
    GOOGLE_ROOT_URI
} from "../../../workflow/oauth/google/type";
import { BaseOAuthHandler } from "./base-oauth-handler";
import { IOAuth, IOAuthData, IOAuthRepository, OAuthToken, RequestTypes } from "./type";

export interface GoogleOAuthConfig extends IOAuth {}

export interface GoogleUserData extends IOAuthData {
    id: string,
    email: string,
    verified_email: string,
    name: string,
    given_name: string,
    family_name: string,
    picture: string,
    locale: string
}

export interface IGoogleOAuthRepository extends IOAuthRepository<GoogleUserData> {
    getUserData(token: OAuthToken): Promise<GoogleUserData>
}

export default class GoogleOAuthHandler extends BaseOAuthHandler<GoogleOAuthConfig, GoogleUserData> implements IGoogleOAuthRepository {

    constructor() {
        super()

        this.scope = [
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile"
        ]


        this.config = {
            root_url: GOOGLE_ROOT_URI,
            app_id: GOOGLE_CLIENT_ID,
            secret_key: GOOGLE_CLIENT_SECRET,
            method: RequestTypes.POST,
            redirect_uri: GOOGLE_REDIRECT_URI,
            get_token_uri: GOOGLE_GET_TOKEN_URI,
            get_user_uri: GOOGLE_GET_USER_URI
        }

        this.options = {
            redirect_uri: this.config.redirect_uri,
            client_id: this.config.app_id,
            access_type: "offline",
            response_type: "code",
            scope: this.scope.join(" "),
            prompt: "consent"
        }
    }

    public async getUserData(token: OAuthToken): Promise<GoogleUserData> {
        const getUserUri = `${this.config.get_user_uri}=${token.access_token}`

        let user: AxiosResponse
        try {
            user = await axios(getUserUri, { 
                method: 'GET',
                headers: { Authorization: `Bearer ${token.id_token}` }
            })
        }
        catch (error) {
            throw this.errorFactory.badRequestError(`Request to OAuth Server has something wrong when trying to get User Data.`, error.details)

        }

        return user.data
    }
}