export type GetOAuthTokensInput = {
    code: string
}

export type OAuthToken = {
    access_token: string,
    token_type: string,
    expires_in: number,
    id_token?: string,
    auth_type?: string,
    scope?: string,
    refresh_token?: string
}


export interface IOAuthRepository<TOAuthData> {
    getURI(select?: string[]): string
    getOAuthToken(input: any): Promise<OAuthToken>
}
export interface IOauthHandler {
    createRedirectURL(select?: string[]): string
}

export type OAuthOptionAttributes = {
    redirect_uri: string,
    client_id: string,
    response_type: string,
    scope: string,
    access_type?: string,
    auth_type?: string,
    prompt?: string,
}

export type RequestType = 'POST' | 'GET'

export enum RequestTypes {
    POST = 'POST',
    GET = 'GET'
}

export interface IOAuth {
    root_url: string,
    app_id: string,
    secret_key: string,
    method: RequestType,
    redirect_uri: string,
    get_token_uri: string,
    get_user_uri: string,
}
export interface IOAuthData {}