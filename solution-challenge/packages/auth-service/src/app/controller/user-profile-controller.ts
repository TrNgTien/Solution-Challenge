import { AppContext } from "../../bounded-context/type";
import { IUserProfileController } from "../../interface/controller/interface";
import { ControllerResult, HttpRequest } from "../../interface/low-level/type";
import GetProfileWorkflow from "../workflow/user-profile-workflow/get-profile-workflow";
import UpdateProfileWorkflow from "../workflow/user-profile-workflow/update-profile-workflow";

export default class UserProfileController implements IUserProfileController {
    constructor(appContext: AppContext) {}

    public async getProfile(req: HttpRequest): Promise<ControllerResult> {
        const result = await req.container.resolve<GetProfileWorkflow>(`getProfileWorkflow`).execute(req.body)
        
        return { content: result }
    }

    public async updateProfile(req: HttpRequest): Promise<ControllerResult> {
        const result = await req.container.resolve<UpdateProfileWorkflow>(`updateProfileWorkflow`).execute(req.body)

        return { content: result }
    }
}