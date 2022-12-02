import { AppContext } from "../../bounded-context/type";
import { ControllerResult, HttpRequest } from "../../interface/low-level/type";
import { ILocaleController } from '../../interface/controller/interface';
import { container } from "../../container";
import GetLocaleWorkflow from "../workflow/locale-workflow/get-locale-workflow";


export default class AuthController implements ILocaleController {
    constructor(appContext: AppContext) { }

    public async getLocale(req: HttpRequest): Promise<ControllerResult> {
        const result = await container.resolve<GetLocaleWorkflow>(`getLocaleWorkflow`).execute({...req.params, ...req.body})

        return { content: result }
    }
    
}