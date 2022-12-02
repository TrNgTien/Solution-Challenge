import { EntityBase } from '../entity-base'
import { Role } from '../role/role-entity';
import { UserProfile } from '../user-profile/user-profile-entity';


//Standard Attributes interface for User
export interface IUserAttributes {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    profile?: UserProfile;
    password?: string;
    roles?: Role[];
    status: number;
    accountType?: string;
    uuid?: string;
    createdBy?: number;
    createdAt?: Date;
    updatedBy?: number;
    updatedAt?: Date;
}

export class User extends EntityBase implements IUserAttributes {
    public readonly id: number;
    public readonly firstName: string;
    public readonly lastName: string;
    public readonly email: string;
    public readonly profile: UserProfile;
    public readonly password: string;
    public readonly roles?: Role[];
    public readonly status: number;
    public readonly accountType: string;
    public readonly uuid: string;
    public readonly createdAt: Date;
    public readonly createdBy: number;
    public readonly updatedAt: Date;
    public readonly updatedBy: number;

    constructor({
        id,
        firstName,
        lastName,
        email,
        profile,
        password,
        roles,
        status,
        accountType,
        uuid,
        createdAt,
        createdBy,
        updatedBy,
        updatedAt
    }: IUserAttributes) {
        super ();

        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.profile = profile;
        this.password = password;
        this.roles = roles
        this.status = status;
        this.accountType = accountType;
        this.uuid = uuid
        this.createdAt = createdAt;
        this.createdBy = createdBy;
        this.updatedAt = updatedAt;
        this.updatedBy = updatedBy;
    }

    public async validate(): Promise<boolean> {
        ['firstName', 'lastName', 'email', 'status'].forEach(key => {
            if(!this[key]) {
                throw Error(`object missing field ${key}`)
            }
        })
        return true
    }
}