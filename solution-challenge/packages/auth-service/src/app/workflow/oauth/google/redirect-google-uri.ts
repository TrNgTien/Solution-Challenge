import { IGoogleOAuthRepository } from "../../../middleware/handlers/oauth-handler/google-oauth-handler";
import { redirectGoogleURIWorkflowInput, redirectGoogleURIWorkflowOutput } from "./type";


export default class RedirectGoogleUriWorkflow {
    constructor(
        private googleOauthHandler: IGoogleOAuthRepository
    ) {}

    public async execute(credential: redirectGoogleURIWorkflowInput): Promise<redirectGoogleURIWorkflowOutput> {
        const uri = this.googleOauthHandler.getURI()

        return { uri: uri }
    }
}