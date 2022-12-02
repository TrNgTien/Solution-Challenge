import { EntityBase } from '../entity-base'
import { Group } from '../group/group-entity';

export interface IPermissionAttributes {
    id?: number;
    type: string;
    action: string;
    key: string;
    signal?: string;
    groups?: Group[];
    createBy?: number;
    createAt?: Date;
    updatedBy?: number;
    updatedAt?: Date;
}

export class Permission extends EntityBase implements IPermissionAttributes {
    public readonly id: number;
    public readonly type: string;
    public readonly action: string;
    public readonly key: string;
    public readonly signal: string;
    public readonly groups?: Group[];
    public readonly createBy: number;
    public readonly createAt: Date;
    public readonly updatedBy: number;
    public readonly updatedAt: Date;
    

    constructor({
        id,
        key,
        type,
        action,
        signal,
        groups,
        createAt,
        createBy,
        updatedAt, 
        updatedBy
    }: IPermissionAttributes) {
        super()

        this.id = id
        this.key = key;
        this.type = type;
        this.action = action;
        this.signal = signal;
        this.groups = groups;
        this.createAt = createAt;
        this.createBy = createBy;
        this.updatedAt = updatedAt;
        this.updatedBy = updatedBy;
    }
    
    public async validate(): Promise<boolean> {
        ["key" , "type" , "action"].forEach(key => {
            if (!this[key]) { throw Error(`Object missing field ${key}`); }
        })
        return true
    }
}