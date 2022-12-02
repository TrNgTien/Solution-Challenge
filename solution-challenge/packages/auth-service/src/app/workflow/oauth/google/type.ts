import { User } from "../../../../interface/low-level/user/user-entity"

export const  GOOGLE_CLIENT_ID = '1023929353702-702dfvg1efphmfj72dk1gujelqjedqrc.apps.googleusercontent.com'
export const  GOOGLE_CLIENT_SECRET = 'YFbeIF4Ub4hr72xrsFWE2tTo'
export const  GOOGLE_REDIRECT_URI = 'http://localhost:3010/api/oauth/google/url'
export const GOOGLE_GET_TOKEN_URI = "https://oauth2.googleapis.com/token"
export const GOOGLE_GET_USER_URI = "https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token"
export const GOOGLE_ROOT_URI = "https://accounts.google.com/o/oauth2/v2/auth"


export type redirectGoogleURIWorkflowInput = {
    
}

export type redirectGoogleURIWorkflowOutput = {
    uri: string
}

export type getGoogleTokenWorkflowInput = {
    code?: string
}

export type getGoogleTokenWorkflowOutput = {
    message: string,
    user?: User,
    token: string
}