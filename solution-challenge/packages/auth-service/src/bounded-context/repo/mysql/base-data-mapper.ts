import { container } from "../../../container";
import { IEntity, IEntityFactory } from "../../../interface/low-level/interface";
import { IObjectHelper } from "../../../interface/utils/helpers/helpers-interface";
import { EntityType } from "../../type";
import { IDataMapper } from "./interface";

export abstract class BaseDataMapper<TEntity extends IEntity> implements IDataMapper<TEntity> {
    protected entityFactory: IEntityFactory
    protected objectHelper: IObjectHelper
    
    protected abstract entityType: EntityType;
    protected abstract toEntityFields: string[];
    protected abstract toDatabaseFields: string[];

    constructor () {
        this.entityFactory = container.resolve<IEntityFactory>('entityFactory')
        this.objectHelper = container.resolve<IObjectHelper>('objectHelper')
    }

    public toEntity(data: any, select?: string[]): TEntity {
        let field = this.toEntityFields

        if (select) {
            field = select
        }

        const params = this.objectHelper.pick(data, field)

        return <TEntity>this.entityFactory.create(this.entityType, params)
    }

    public toDatabase(entity: TEntity, select?: string[]): any {
        let fields = this.toDatabaseFields
        
        if (select) {
            fields = select
        }

        const params = this.objectHelper.pick(entity, fields)
        
        return this.objectHelper.omitByUndefined(params)
    }
}