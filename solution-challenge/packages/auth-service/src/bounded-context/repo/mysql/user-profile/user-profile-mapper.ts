import { UserProfile } from "../../../../interface/low-level/user-profile/user-profile-entity";
import { EntityType, EntityTypes } from "../../../type";
import { BaseDataMapper } from "../base-data-mapper";

export default class UserProfileMapper extends BaseDataMapper<UserProfile> {
    protected entityType: EntityType;
    protected toEntityFields: string[];
    protected toDatabaseFields: string[];

    constructor() {
        super()

        this.entityType = EntityTypes.UserPofile
        
        this.toEntityFields = [
            'id',
            'firstName',
            'lastName',
            'gender',
            'birthday',
            'phone',
            'address',
            'job',
            'company',
            'academicLevel',
            'bachelor'
        ]

        this.toDatabaseFields = [
            'id',
            'userId',
            'firstName',
            'lastName',
            'gender',
            'birthday',
            'address',
            'phone',
            'job',
            'company',
            'academicLevel',
            'bachelor'
        ]
    }
}