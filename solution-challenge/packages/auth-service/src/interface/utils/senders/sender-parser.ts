import { container } from "../../../container";
import { IObjectHelper } from "../helpers/helpers-interface";
import { ISenderParser, SenderInput } from "./interface";
import { Sender } from "./sender-type/sender";
import { SenderBuilder } from "./senders-builder";

export default class SenderParser implements ISenderParser{
    private objectHelper: IObjectHelper

    constructor() {
        this.objectHelper = container.resolve<IObjectHelper>(`objectHelper`)
    }

    public validate(data: any): any {
        ['address', 'subject', 'template', 'attributes'].forEach(key => {
            if (!data[key]) { 
                throw new Error(`missing ${key} for creating email`) 
            }
        })
    }

    public parse(data: SenderInput): Sender {
        const builder = new SenderBuilder()

        data = this.objectHelper.omitByUndefined(data)

        this.validate(data)

        builder
        .setAddress(data.address)
        .setSubject(data.subject)
        .setTypes(data.type)
        .setTemplate(data.template)
        .setAtrributes(data.attributes)
        
        return builder.build()
    }
}