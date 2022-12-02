import { Role } from "../../../../interface/low-level/role/role-entity";
import { EntityType, EntityTypes } from "../../../type";
import { BaseDataMapper } from "../base-data-mapper";

export default class MySQLRoleMapper extends BaseDataMapper<Role> {
    protected entityType: EntityType;
    protected toEntityFields: string[];
    protected toDatabaseFields: string[];

    constructor() {
        super()

        this.entityType = EntityTypes.Role
        
        this.toEntityFields = ['id', 'name', 'users', 'groups', 'createdAt', 'createdBy']

        this.toDatabaseFields = ['id', 'name', 'users', 'groups', 'createdAt', 'createdBy']

    }
}