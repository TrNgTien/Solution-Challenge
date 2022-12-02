import { ControllerResult, HttpRequest } from "../low-level/type";

export interface IAuthController {
    generateToken(req: HttpRequest): Promise<ControllerResult>
    registerAccount(req: HttpRequest): Promise<ControllerResult>
    verifyAccount(req: HttpRequest): Promise<ControllerResult>
    resendHashcode(req: HttpRequest): Promise<ControllerResult>
    recoverPassword(req: HttpRequest): Promise<ControllerResult>
    changingPassword(req: HttpRequest): Promise<ControllerResult>
    // redirectGoogletUri(req: HttpRequest): Promise<ControllerResult>
}

export interface ILocaleController {
    getLocale(req: HttpRequest): Promise<ControllerResult>
}

export interface IOAuthController {
    redirectGoogletUri(req: HttpRequest): Promise<ControllerResult>
    getGoogleToken(req: HttpRequest): Promise<ControllerResult>
    redirectFacebookUri(req: HttpRequest): Promise<ControllerResult>
    getFacebookToken(req: HttpRequest): Promise<ControllerResult>
}

export interface ITwoFactorController {
    verifyAccount(req: HttpRequest): Promise<ControllerResult>
    resendHashcode(req: HttpRequest): Promise<ControllerResult>
    // redirectGoogletUri(req: HttpRequest): Promise<ControllerResult>
}

export interface IPermissionController {
    createRoles(req: HttpRequest): Promise<ControllerResult>
    createGroups(req: HttpRequest): Promise<ControllerResult>
}

export interface IUserProfileController {
    getProfile(req: HttpRequest): Promise<ControllerResult>
    updateProfile(req: HttpRequest): Promise<ControllerResult>
}