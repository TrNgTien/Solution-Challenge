import { HttpRequest } from "../../../interface/low-level/type";
import { ITokenHandler } from "../../../interface/middleware/interface";
import { IObjectHelper } from "../../../interface/utils/helpers/helpers-interface";

export type OAuthTokenInput = {
    code: string,
    client_id: string,
    client_secret: string,
    redirect_uri: string,
    grant_type?: string
} 

export default class TokenHandler implements ITokenHandler {
    private token

    constructor (
        private objectHelper: IObjectHelper
    ) {}

    public getToken(req: HttpRequest): any {
        if (req.query.token) {
            return req.query.token
        }

        if (req.headers.authorization) {
            return req.headers.authorization
        }

        return null
    }

    // public async getFacebookOAuthTokens(input: GetOAuthTokensInput): Promise<OAuthToken> {
    //     const url = FACEBOOK_GET_TOKEN_URI

    //     const value: OAuthTokenInput = {
    //         code: input.code,
    //         client_id: FACEBOOK_APP_ID,
    //         client_secret: FACEBOOK_APP_SECRET,
    //         redirect_uri: FACEBOOK_REDIRECT_URI,
    //         grant_type: "authorization_code"
    //     }

    //     let oauthToken: AxiosResponse
    //     try {
    //         oauthToken = await axios.get(url, { params: value })
    //     }
    //     catch (error) {
    //         throw error
    //     }

    //     return oauthToken.data
    // }

    // public async getGoogleOAuthTokens(input: GetOAuthTokensInput): Promise<OAuthToken> {
    //     const url = GOOGLE_GET_TOKEN_URI

    //     const value: OAuthTokenInput = {
    //         code: input.code,
    //         client_id: GOOGLE_CLIENT_ID,
    //         client_secret: GOOGLE_CLIENT_SECRET,
    //         redirect_uri: GOOGLE_REDIRECT_URI,
    //         grant_type: "authorization_code"
    //     }

    //     let oauthToken: AxiosResponse
    //     try {
    //         oauthToken = await axios.post(url, {} ,{ params: value })
    //     }
    //     catch (error) {
    //         throw error
    //     }

    //     return oauthToken.data
    // }

    public handle(req: HttpRequest): string {
        this.token = this.getToken(req)

        return this.token
    }

    
   
}