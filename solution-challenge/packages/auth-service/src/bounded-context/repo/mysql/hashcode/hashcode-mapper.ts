import { Hashcode } from "../../../../interface/low-level/hashcode/hashcode-entity";
import { EntityType, EntityTypes } from "../../../type";
import { BaseDataMapper } from "../base-data-mapper";


export default class HashCodeMapper extends BaseDataMapper<Hashcode> {
    protected entityType: EntityType;
    protected toEntityFields: string[];
    protected toDatabaseFields: string[];

    constructor() {
        super()

        this.entityType = EntityTypes.Hashcode;
        this.toEntityFields = [
            'id',
            'userId',
            'key',
            'type',
            'expiredIn',
            'createdBy',
            'createdAt',
            'updatedBy',
            'updatedAt'
        ]

        this.toDatabaseFields = [
            'userId',
            'key',
            'type',
            'expiredIn',
            'createdBy',
            'createdAt',
            'updatedBy',
            'updatedAt'
        ]
    }
}