import { Group } from "../../../../interface/low-level/group/group-entity";
import { EntityType, EntityTypes } from "../../../type";
import { BaseDataMapper } from "../base-data-mapper";

export default class MySQLGroupRepository extends BaseDataMapper<Group> {
    protected entityType: EntityType;
    protected toEntityFields: string[];
    protected toDatabaseFields: string[];

    constructor() {
        super()

        this.entityType = EntityTypes.Group
        this.toEntityFields = ['id', 'name', 'createdBy', 'createdAt']
        this.toDatabaseFields = ['id', 'name', 'createdBy', 'createdAt']
    }

    
}