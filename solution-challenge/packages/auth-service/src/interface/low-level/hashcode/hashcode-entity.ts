import { EntityBase } from "../entity-base";

export type HashcodeType = HashcodeTypes.RECOVER_CODE | HashcodeTypes.REGISTER_CODE

export enum HashcodeTypes {
    REGISTER_CODE = 'register-code',
    RECOVER_CODE = 'recover-code'
}

export interface IHashcodeAtrributes {
    id?: number,
    key: string,
    type: HashcodeType,
    userId: number,
    expiredIn: Date,
    createdBy?: number;
    createdAt?: Date;
    updatedBy?: number;
    updatedAt?: Date;
}

export class Hashcode extends EntityBase implements IHashcodeAtrributes {
    public readonly id: number;
    public readonly key: string;
    public readonly type: HashcodeType;
    public readonly userId: number;
    public readonly expiredIn: Date
    public readonly createdBy: number;
    public readonly createdAt: Date;
    public readonly updatedBy: number;
    public readonly updatedAt: Date;

    constructor({
        id,
        key,
        userId,
        type,
        expiredIn,
        createdBy,
        createdAt,
        updatedBy,
        updatedAt
    }: IHashcodeAtrributes) {
        super()

        this.id = id,
        this.key = key,
        this.type = type
        this.userId = userId,
        this.expiredIn = expiredIn,
        this.createdBy = createdBy,
        this.createdAt = createdAt,
        this.updatedBy = updatedBy,
        this.updatedAt = updatedAt
    }

    public async validate(): Promise<boolean> {
        ["key"].forEach(key => {
            if (!this[key]) { throw Error(`Object missing field ${key}`); }
        })
        return true
    }
}