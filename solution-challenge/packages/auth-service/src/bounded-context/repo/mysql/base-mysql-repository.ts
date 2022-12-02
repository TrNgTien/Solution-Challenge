import { container } from "../../../container";
import { IQueryFactory } from "../../../interface/db/interface";
import { DatabaseModel } from "../../../interface/db/type";
import { IEntity, IErrorFactory, IRepository } from "../../../interface/low-level/interface";
import { IArrayHelper } from "../../../interface/utils/helpers/helpers-interface";
import { AppContext, Criteria, PaginateResult } from "../../type";
import { IDataMapper } from "./interface";

//Base Repos for all Entity
export abstract class BaseMySQLRepository<TEntity extends IEntity> implements IRepository<TEntity> {
    protected abstract model: DatabaseModel;
    protected abstract mapper: IDataMapper<TEntity>;
    protected abstract appContext: AppContext;

    protected errorFactory: IErrorFactory;
    protected queryFactory: IQueryFactory;
    protected arrayHelper: IArrayHelper;

    constructor() {

        this.errorFactory = container.resolve<IErrorFactory>(`errorFactory`);
        this.queryFactory = container.resolve<IQueryFactory>(`queryFactory`);
        this.arrayHelper = container.resolve<IArrayHelper>(`arrayHelper`);

    }


    paginate(criteria: Criteria): Promise<PaginateResult<TEntity>> {
        throw new Error("Method not implemented.");
    }

    public async find(criteria: Criteria): Promise<TEntity[]> {
        const findQuery = this.queryFactory.createFindQuery(this.appContext, this.model)

        const docs = await findQuery.execute(criteria)

        return docs.map(doc => this.mapper.toEntity(doc, criteria.select))
    }

    public async findById(id: number, criteria?: Criteria): Promise<TEntity> {


        const FindByIdQuery = this.queryFactory.createFindByIdQuery(this.appContext, this.model)

        const doc = await FindByIdQuery.execute(id, criteria)

        return this.mapper.toEntity(doc)
    }

    public async create(entity: TEntity, options?: { include?: any }): Promise<TEntity> {
        try {
            const createQuery = this.queryFactory.createCreateQuery(this.appContext, this.model)
            
            const omited = this.mapper.toDatabase(entity)

            const doc = await createQuery.execute(omited, options)
            
            return this.mapper.toEntity(doc)
        }
        catch (error) {
            if(error.name === 'SequelizeUniqueConstraintError') {
                throw this.errorFactory.badRequestError(error.errors[0].message, error.fields)
                
            }
            throw error
        }
    }


    public async update(data: any, criteria: Criteria): Promise<TEntity> {
        try {
            const updateQuery = this.queryFactory.createUpdateQuery(this.appContext, this.model)

            const doc = await updateQuery.execute(criteria, this.mapper.toDatabase(data))

            return this.mapper.toEntity(doc)
        }
        catch (error) {
            if(error.name === 'SequelizeUniqueConstraintError') {
                throw this.errorFactory.badRequestError(error.errors[0].message, error.fields)
                
            }
            throw error
        }
    }

    updateById(id: number, entity: TEntity): Promise<TEntity> {
        throw new Error("Method not implemented.");
    }

    deleteById(id: number): Promise<undefined> {
        throw new Error("Method not implemented.");
    }

    bulkCreate(entities: TEntity[]): Promise<TEntity[]> {
        throw new Error("Method not implemented.");
    }

    bulkUpdate(criteria: Criteria, entities: any): Promise<TEntity[]> {
        throw new Error("Method not implemented.");
    }

    bulkDelete(criteria: Criteria): Promise<undefined> {
        throw new Error("Method not implemented.");
    }

    count(criteria: Criteria): Promise<number> {
        throw new Error("Method not implemented.");
    }

    isExist(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}