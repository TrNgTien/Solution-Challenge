import {Permission} from '../permission/permission-entity'
import {EntityBase} from '../entity-base'

//Standard Attributes interface for Class Group
export interface IGroupAttributes {
    id?: number;
    name: string;
    permissions?: Permission[];
    createBy?: number;
    createAt?: Date;
    updatedBy?: number;
    updatedAt?: Date;
}

export class Group extends EntityBase implements IGroupAttributes {
    public readonly id: number;
    public readonly name: string;
    public readonly permissions: Permission[];
    public readonly createBy: number;
    public readonly createAt: Date;
    public readonly updatedBy: number;
    public readonly updatedAt: Date;

    constructor ({
        id,
        name,
        permissions,
        createBy,
        createAt,
        updatedAt, 
        updatedBy
    }: IGroupAttributes) {
        super()

        this.id = id;
        this.name = name;
        this.permissions = permissions;
        this.createBy = createBy;
        this.createAt = createAt;
        this.updatedAt = updatedAt;
        this.updatedBy = updatedBy;
    }

    public async validate(): Promise<boolean> {
        ["name"].forEach(key => {
            if (!this[key]) { throw Error(`Object missing field ${key}`); }
        })
        return true
    }
}
