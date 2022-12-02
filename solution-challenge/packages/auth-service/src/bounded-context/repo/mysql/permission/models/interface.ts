import { Permission } from "../../../../../interface/low-level/permission/permission-entity";


export interface IPermissionModel {
    resolveModel(p : Permission) : any;
}