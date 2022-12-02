import { Permission } from "../../../../../../interface/low-level/permission/permission-entity";
import BaseDictionary from "../base-dictionary";

export class APIDictionaryFactory  {
    
    constructor(){
        
    }
    public toString(triggerEvent: any): string {
        throw new Error("Method not implemented.");
    }
    public fromString(triggerString: string) {
        throw new Error("Method not implemented.");
    }
    public translate(base: Permission, dest: Permission): Promise<Boolean> {
        throw new Error("Method not implemented.");
    }

}