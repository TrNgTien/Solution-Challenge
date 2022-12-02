import { Permission } from "../../../../interface/low-level/permission/permission-entity";
import { EntityType, EntityTypes } from "../../../type";
import { BaseDataMapper } from "../base-data-mapper";

export default class MySQLMapper extends BaseDataMapper<Permission> {
    protected entityType: EntityType;
    protected toEntityFields: string[];
    protected toDatabaseFields: string[];

    constructor() {
        super()

        this.entityType = EntityTypes.Permission

        this.toEntityFields = ['id', 'type', 'action', 'key','signal', 'groups', 'createdBy', 'createdAt']
        
        this.toDatabaseFields = ['id', 'type', 'action', 'key', 'signal', 'groups']
        
    }
}