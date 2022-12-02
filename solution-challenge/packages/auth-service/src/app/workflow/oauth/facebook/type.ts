import { User } from "../../../../interface/low-level/user/user-entity"

export const FACEBOOK_APP_ID = '186255049498531'
export const FACEBOOK_APP_SECRET = 'afa04c28dd5eb2139fceb89a30b2587b'
export const FACEBOOK_REDIRECT_URI = 'http://localhost:3010/api/oauth/facebook/url'
export const FACEBOOK_GET_TOKEN_URI = 'https://graph.facebook.com/v9.0/oauth/access_token?'
export const FACEBOOK_GET_USER_URI = 'https://graph.facebook.com/me'
export const FACEBOOK_ROOT_URL = 'https://www.facebook.com/v9.0/dialog/oauth'

export type redirectFacebookURIWorkflowInput = {
    
}

export type redirectFacebookURIWorkflowOutput = {
    uri: string
}

export type GetFacebookTokenWorkflowInput = {
    code?: string
}

export type GetFacebookTokenWorkflowOutput = {
    message: string,
    user?: User,
    token: string
}

export type OAuthAccountType = 'Facebook'

export enum OAuthAccountTypes {
    Facebook = 'Facebook'
}