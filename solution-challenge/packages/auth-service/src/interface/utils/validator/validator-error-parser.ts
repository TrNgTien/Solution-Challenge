import { IValidatorErrorParser } from "./interface";
import { ValidationErrorDetail, ValidatorErrorObject } from "./type";

export default class ValidatorErrorParser implements IValidatorErrorParser {
    public parse(errors: ValidatorErrorObject[]): ValidationErrorDetail[] {
        return errors.map((error: ValidatorErrorObject) => {
            console.log(`keyword`,error.keyword)
            switch (error.keyword) {
                case 'required': return this.required(error)
                case 'format': return this.format(error)

                default: return {
                    error: error.message,
                    field: error.dataPath
                }
            }
        })
    }
   
    private required(error: ValidatorErrorObject): ValidationErrorDetail {
        console.log(error.params)
        const params: any = error.params

        return {
            error: 'should be required',
            field: params.missingProperty
        }
    }

    private format(error: ValidatorErrorObject): ValidationErrorDetail {
        const params: any = error.params

        return {
            error: error.message,
            field: params
        }
    }
}