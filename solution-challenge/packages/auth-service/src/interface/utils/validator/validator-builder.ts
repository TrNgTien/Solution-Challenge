import * as Ajv from 'ajv'
import addFormats from 'ajv-formats'

import { ValidatorInstance, ValidatorOptions, ValidatorSchemas } from "./type";

export default class ValidatorBuilder {

    public static create(validationSchemas: ValidatorSchemas, options?: ValidatorOptions): ValidatorInstance {
        if (!validationSchemas) {
            throw Error('invalid validation schemas')
        }
        
        if(!options) {
            options = { allErrors: true, removeAdditional: true }
        }

        console.log(options)

        options.schemas =  validationSchemas

        const instance = new Ajv.default(options)

        addFormats(instance)

        return instance
    }
}