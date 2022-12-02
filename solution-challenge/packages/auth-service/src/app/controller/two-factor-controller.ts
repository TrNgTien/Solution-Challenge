import { AppContext } from "../../bounded-context/type"
import { ITwoFactorController } from "../../interface/controller/interface"
import { HttpRequest, ControllerResult } from "../../interface/low-level/type"
import ResendHashCodeWorkflow from "../workflow/resend-hashcode/resend-hashcode"
import VerifyAccountWorkflow from "../workflow/verify-account/verify-account"

export default class AuthController implements ITwoFactorController {
    constructor(appContext: AppContext) {}

    public async verifyAccount(req: HttpRequest): Promise<ControllerResult> {
        const result = await req.container.resolve<VerifyAccountWorkflow>(`verifyAccount`).execute(req.params)
        return {content: result }
    }

    public async resendHashcode(req: HttpRequest): Promise<ControllerResult> {
        const result = await req.container.resolve<ResendHashCodeWorkflow>(`resendHashcode`).execute({token: req.appContext.token})
        return { content: result }
    }
}