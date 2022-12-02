import { container } from "../../container";
import { IOAuthController } from "../../interface/controller/interface";
import { HttpRequest, ControllerResult } from "../../interface/low-level/type";
import GetFacebookTokenWorkflow from "../workflow/oauth/facebook/get-facebook-token";
import RedirectFacebookUriWorkflow from "../workflow/oauth/facebook/redirect-facebook-uri";
import GetGoogleTokenWorkflow from "../workflow/oauth/google/get-google-token";
import RedirectGoogleUriWorkflow from "../workflow/oauth/google/redirect-google-uri";

export default class OAuthController implements IOAuthController {
    public async redirectGoogletUri(req: HttpRequest): Promise<ControllerResult> {
        const result = await req.container.resolve<RedirectGoogleUriWorkflow>(`redirectGoogleUri`).execute(req.body)
        return { content: result }
    }

    public async getGoogleToken(req: HttpRequest): Promise<ControllerResult> {
        const result = await req.container.resolve<GetGoogleTokenWorkflow>(`getGoogleToken`).execute(req.query)
        return { content: result }
    }

    public async redirectFacebookUri(req: HttpRequest): Promise<ControllerResult> {
        const result = await req.container.resolve<RedirectFacebookUriWorkflow>(`redirectFacebookUri`).execute(req.body)
        return { content: result }
    }

    public async getFacebookToken(req: HttpRequest): Promise<ControllerResult> {
        const result = await req.container.resolve<GetFacebookTokenWorkflow>(`getFacebookToken`).execute(req.query)
        return { content: result }
    }
}