import axios, { AxiosResponse } from 'axios';
import querystring from 'querystring'
import { container } from '../../../../container';
import { IErrorFactory } from '../../../../interface/low-level/interface';
import { OAuthTokenInput } from '../token-handler';
import { IOAuth, IOAuthData, IOAuthRepository, OAuthOptionAttributes, OAuthToken } from './type';

export abstract class BaseOAuthHandler<TOAuth extends IOAuth, TOAuthData extends IOAuthData> implements IOAuthRepository<TOAuthData> {
    protected scope: string[];
    protected config: TOAuth;
    protected options: OAuthOptionAttributes

    protected errorFactory: IErrorFactory

    constructor() {

        this.errorFactory = container.resolve<IErrorFactory>(`errorFactory`)

    }

    public getURI(select?: string[]): string {
        let scope = this.scope

        if(!select) {
            scope = select
        }

        return `${this.config.root_url}?${querystring.stringify(this.options)}`
    }

    public async getOAuthToken(input: any): Promise<OAuthToken> {
        const url = this.config.get_token_uri

        const value: OAuthTokenInput = {
            code: input.code,
            client_id: this.config.app_id,
            client_secret: this.config.secret_key,
            redirect_uri: this.config.redirect_uri,
            grant_type: "authorization_code"
        }

        let oauthToken: AxiosResponse
        try {
            oauthToken = await axios(url, {method: this.config.method, params: value})
        }
        catch (error) {
            throw this.errorFactory.badRequestError(`Request to OAuth Server has something wrong when trying to get OAuth Token.`, error.details)
        }

        return oauthToken.data
        
    }

}