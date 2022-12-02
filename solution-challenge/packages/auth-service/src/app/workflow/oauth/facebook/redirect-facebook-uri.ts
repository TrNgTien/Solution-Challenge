import { redirectFacebookURIWorkflowInput, redirectFacebookURIWorkflowOutput } from "./type"
import { IFacebookOAuthRepository } from "../../../middleware/handlers/oauth-handler/facebook-oauth-handler"

export default class RedirectFacebookUriWorkflow {
    constructor(

        private facebookOauthHandler: IFacebookOAuthRepository

    ) {}

    public async execute(credential: redirectFacebookURIWorkflowInput): Promise<redirectFacebookURIWorkflowOutput> {
        const uri = this.facebookOauthHandler.getURI()
        
        return { uri: uri }
    }
}