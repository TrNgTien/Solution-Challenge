import { EntityBase } from '../entity-base'
import { Permission } from '../permission/permission-entity'
import { Group } from '../group/group-entity'
import { User } from '../user/user-entity';

//Standard Attributes interface for Role
export interface IRoleAttributes {
    id?: number;
    name: string;
    users?: User | User[];
    groups?: Group[];
    // permissions: Permission[];
    createdBy?: number;
    createdAt?: Date;
}

export class Role extends EntityBase implements IRoleAttributes {
    public readonly id: number;
    public readonly name: string;
    public readonly users: User | User[];
    public readonly groups: Group[];
    public readonly createdBy: number;
    public readonly createdAt: Date;
    
    constructor({
        id,
        name,
        users,
        groups,
        createdBy,
        createdAt,
        
    }: IRoleAttributes) {
        super()

        this.id = id;
        this.name = name;
        this.users = users;
        this.groups = groups;
        this.createdBy = createdBy;
        this.createdAt = createdAt;

    }

    public async validate(): Promise<boolean> {
        ["name"].forEach(key => {
            if(!this[key]) { throw Error(`object missing field ${key}`) }
        })
        return true
    }
}