import * as Ajv from 'ajv'

export type ValidatorInstance = Ajv.default;

export type ValidatorOptions = Ajv.Options;
export type ValidatorSchemas =  Ajv.AnySchema[] |  {
    [Key in string]?: Ajv.AnySchema;}
export type ValidatorErrorObject = Ajv.ErrorObject;

export type ValidationErrorDetail = {field: any, error: string};
export type ValidationError = Error & { details?: ValidationErrorDetail[] };