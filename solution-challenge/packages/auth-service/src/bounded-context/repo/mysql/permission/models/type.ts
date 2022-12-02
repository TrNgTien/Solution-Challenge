import { Permission } from "../../../../../interface/low-level/permission/permission-entity"


type PermissionAction = {
    actionName: string,
    actionID : number,
    triggeredBy : any
}
type PermissionOutput = {
    outputName : string,
    outputID: number,
    outputTrigger: any
}
export {PermissionAction , PermissionOutput}