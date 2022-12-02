import { ValidationErrorDetail, ValidatorErrorObject } from "./type";

export interface IValidator {
    validate(schemaName: string, data: any): Promise<boolean | Promise<unknown>>;
}

export interface IValidatorErrorParser {
    parse(errors: ValidatorErrorObject[]): ValidationErrorDetail[];
}