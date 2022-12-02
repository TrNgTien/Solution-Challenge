import { IErrorFactory } from "../../../interface/low-level/interface";
import { ILocalService } from "../../../interface/services/locale-service/locale-service";
import { IValidator } from "../../../interface/utils/validator/interface";
import { GetLocaleWorkflowInput, GetLocaleWorkflowOutput } from "./type";

export default class GetLocaleWorkflow {
    constructor(

        private validator: IValidator,
        private errorFactory: IErrorFactory,
        private localeService: ILocalService

    ) { }

    public async execute(credential: GetLocaleWorkflowInput): Promise<GetLocaleWorkflowOutput> {
        try {
            await this.validator.validate(`GetLocaleWorkflowInput`, credential)
        }
        catch (error) {
            throw this.errorFactory.badRequestError(error.message, error.details)
        }

        const locale = this.localeService.getLocale(credential.select, credential.language)

        console.log(`locale: `, locale)

        return { data: locale }
    }
}