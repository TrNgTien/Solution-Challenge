import { UserProfile } from "../../../../interface/low-level/user-profile/user-profile-entity";
import { User } from "../../../../interface/low-level/user/user-entity";
import { IPasswordHelper } from "../../../../interface/utils/helpers/helpers-interface";
import { EntityType, EntityTypes } from "../../../type";
import { BaseDataMapper } from "../base-data-mapper";
import { IDataMapper } from "../interface";

export default class MySQLUserMapper extends BaseDataMapper<User> {
    protected entityType: EntityType;
    protected toEntityFields: string[];
    protected toDatabaseFields: string[];

    constructor(private passwordHelper: IPasswordHelper, private userProfileMapper: IDataMapper<UserProfile>) {
        super()

        this.entityType = EntityTypes.User

        this.toEntityFields = [
            'id', 
            'firstName', 
            'lastName', 
            'email', 
            'profile',
            'password', 
            'status',
            'accountType',
            'uuid',
            'createdBy', 
            'createdAt', 
            'updatedBy', 
            'updatedAt'
        ]

        this.toDatabaseFields = ['id', 'firstName', 'lastName', 'email', 'password', 'status', 'accountType', 'uuid','createdBy', 'createdAt', 'updatedBy', 'updatedAt']
    }

    public toEntity(data: any, select?: string[]): User {
        let field = this.toEntityFields

        if(select) {
            field = select
        }
        
        let params = this.objectHelper.pick(data, field)

        if(params['profile']) {
            params['profile'] = this.userProfileMapper.toEntity(params['profile'])
        }
        
        return <User>this.entityFactory.create(this.entityType, params)
    }

    public toDatabase(entity: User, select?: string[]): any {
        let fields = this.toDatabaseFields

        if(select) {
            fields = select
        }

        const params = this.objectHelper.pick(entity, fields)

        if (params.password) {
            params.password = this.passwordHelper.encrypt(params.password)
        }

        return this.objectHelper.omitByUndefined(params)
    }
} 