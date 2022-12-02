import { ISender, SenderAttributes, SenderTypes } from "../interface";
import EmailSender from "./email-sender";

export class Sender {
    
    public data: SenderAttributes
    // public tranport: any;

    constructor (data: SenderAttributes) {
        this.data = data
    }
    public async execute(): Promise<void> {
        let sender: ISender

        switch (this.data.type) {
            case (SenderTypes.Email): sender = new EmailSender(this.data)
        }

        return await sender.execute()
    }
    
}