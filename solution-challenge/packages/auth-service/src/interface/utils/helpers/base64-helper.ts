import { IBase64Helper } from "./helpers-interface";


//difine handle function for Base64 type.
export default class Base64Helper implements IBase64Helper {
    public encode(input: any): string {
        return //Buffer.from(input).toString('base64')
    }

    public decode(input:string): string {
        return 
    }
}