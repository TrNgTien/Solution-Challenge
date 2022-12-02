import { SenderAttributes, SenderType, Template } from "./interface"
import { Sender } from "./sender-type/sender"

export class SenderBuilder {
    public data: SenderAttributes = {}

    public setAddress(address: string): SenderBuilder {
        this.data.address = address
        return this
    }

    public setSubject(subject?: string): SenderBuilder {
        this.data.subject = subject
        return this
    }

    public setAtrributes(attributes?: { [key: string]: string }): SenderBuilder {
        this.data.attributes = attributes
        return this
    }

    public setTypes(type?: SenderType): SenderBuilder {
        this.data.type = type
        return this
    }

    public setTemplate(template: Template): SenderBuilder {
        this.data.template = template
        return this
    }

    public build(): Sender {
        return new Sender(this.data)
    }
}