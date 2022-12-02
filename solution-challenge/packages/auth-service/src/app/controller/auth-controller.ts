import RegisterAccountWorkflow from "../workflow/register-account/register-account";
import { AppContext } from "../../bounded-context/type";
import { ControllerResult, HttpRequest } from "../../interface/low-level/type";
import { IAuthController } from '../../interface/controller/interface';
import VerifyAccountWorkflow from "../workflow/verify-account/verify-account";
import ResendHashCodeWorkflow from "../workflow/resend-hashcode/resend-hashcode";
import GenerateTokenWorkflow from "../workflow/generate-token/generate-token";
import ChangingPasswordWorkflow from "../workflow/changing-password-workflow/changing-password-workflow";
import RecoverPasswordcodeWorkflow from "../workflow/changing-password-workflow/recover-password-workflow";
import RecoverPasswordWorkflow from "../workflow/changing-password-workflow/recover-password-workflow";

export default class AuthController implements IAuthController {
    constructor(appContext: AppContext) { }

    public async generateToken(req: HttpRequest): Promise<ControllerResult> {
        const result = await req.container.resolve<GenerateTokenWorkflow>(`generateToken`).execute(req.body)

        return { content: result }
    }

    public async registerAccount(req: HttpRequest): Promise<ControllerResult> {
        const result = await req.container.resolve<RegisterAccountWorkflow>(`registerAccount`).execute(req.body)

        return { content: result }
    }

    public async verifyAccount(req: HttpRequest): Promise<ControllerResult> {
        const result = await req.container.resolve<VerifyAccountWorkflow>(`verifyAccount`).execute(req.query)
        return { content: result }
    }

    public async resendHashcode(req: HttpRequest): Promise<ControllerResult> {
        const result = await req.container.resolve<ResendHashCodeWorkflow>(`resendHashcode`).execute(req.body)
        return { content: result }
    }

    public async changingPassword(req: HttpRequest): Promise<ControllerResult> {
        const result = await req.container.resolve<ChangingPasswordWorkflow>(`changingPasswordWorkflow`).execute({ ...req.params, ...req.body })

        return { content: result }
    }

    public async recoverPassword(req: HttpRequest): Promise<ControllerResult> {
        const result = await req.container.resolve<RecoverPasswordWorkflow>(`recoverPasswordWorkflow`).execute(req.body)

        return { content: result }
    }
}