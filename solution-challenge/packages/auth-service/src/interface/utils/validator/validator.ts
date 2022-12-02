import { IValidator, IValidatorErrorParser } from "./interface";
import { ValidationError, ValidatorInstance, ValidatorSchemas } from "./type";
import ValidatorBuilder from "./validator-builder";

export default class Validator implements IValidator {
    private instance: ValidatorInstance;

    constructor(validationSchemas: ValidatorSchemas, private validatorErrorParser: IValidatorErrorParser) {
        this.instance = ValidatorBuilder.create(validationSchemas)
    }

    public async validate(schemaName: string, data: any): Promise<boolean | Promise<unknown>> {
        if(!schemaName) {
            throw Error(`invalid schema name.`)
        }
        if(!data) {
            throw Error ('invalid data')
        }

        const validateFn = this.instance.getSchema(schemaName)

        if(!validateFn) {
            throw Error(`schema name ${schemaName} does not support.`)
        }

        console.log(data)

        const result = validateFn(data)

        console.log(result)

        console.log(data)

        if(typeof result === 'boolean') {
            if(result) {
                return true
            }

            const err: ValidationError = Error('validation errors')
            err.details = this.validatorErrorParser.parse(validateFn.errors)
            throw err
        }

        return await result
    }
}