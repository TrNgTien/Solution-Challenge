import { Permission } from "../../../../../../interface/low-level/permission/permission-entity";
import BaseDictionary from "../base-dictionary";
import { PermissionAction, PermissionOutput } from "../type";

export enum ComponentTrigger {
    SUBMIT,
    HOVER,
    LOAD,
    COPY,
    PASTE,
    CUT,
    ERROR,
    PLAY,
    USE
}
export enum ComponentOutputTrigger{
    NOT_ALLOW,
    NOT_DISPLAY,
    
}
const ComponentAction : PermissionAction[] = [
    {
        actionID: 1,
        actionName: "",
        triggeredBy: ComponentTrigger.SUBMIT
    }

];
const ComponentOutput : PermissionOutput[] = [
    {
        outputID: 1,
        outputName: "",
        outputTrigger: ComponentOutputTrigger.NOT_ALLOW
    }
]
export class COMPDictionaryFactory extends BaseDictionary{
    
    constructor() {
        super(ComponentAction , ComponentOutput)
    }
    
    public translate(base: Permission, dest: Permission): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    public toString(triggerEvent: any): string {
        throw new Error("Method not implemented.");
    }
    public fromString(triggerString: string) {
        throw new Error("Method not implemented.");
    }
}