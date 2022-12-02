import { Sender } from "./sender-type/sender"


export interface ISender {
    execute(): Promise<void> 
}

export type Template = {
    hbs?: HBSFile,
    other?: any
}

export type HBSFile = 'verification-email' | 'recover-account'

export enum HBSFiles {
    VERIFICATION = 'verification-email',
    RECOVER_ACCOUNT = 'recover-account'
}
export type SenderAttributes = {
    address?: string,
    // to?: string,
    subject?: string,
    attributes?: { [key: string]: string },
    type?: string,
    template?: Template
}

export type SenderType = 'email' | 'sms'

export enum SenderTypes {
    Email = 'email',
    SMS = 'sms'
}

export type SenderInput = {
    address: string,
    type: SenderType,
    subject?: string
    attributes?: { [key: string]: string }
    template: Template 
}

export interface ISenderParser {
    parse(data: SenderInput): Sender
}

