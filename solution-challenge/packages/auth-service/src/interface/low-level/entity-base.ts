import {IEntity} from './interface'

export abstract class EntityBase implements IEntity {
    public id: number;
    public abstract validate(): Promise<boolean>
}