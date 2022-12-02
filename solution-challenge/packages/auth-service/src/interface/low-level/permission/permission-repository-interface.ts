import { Criteria } from "../../../bounded-context/type";
import { Group } from "../group/group-entity";
import { IRepository } from "../interface";
import { Permission } from "./permission-entity";

export interface IPermissionRepository extends IRepository<Permission> {
    findById(id: number, criteria?: Criteria): Promise<Permission>
    findByRoleId(id : number , criteria?: Criteria) : Promise<Permission[]>
    findByGroupId(id: number, criteria?: Criteria): Promise<Permission[]>
    findByUserId(id: number, criteria?: Criteria): Promise<Permission[]>
    addGroups(permissionIDs: Permission[], groupIDs: Group[]): Promise<void>

    findPermission(permission: {
        type: string,
        action: string,
        key: string,
        signal?: string
}, criteria?: Criteria): Promise<Permission[]>
}