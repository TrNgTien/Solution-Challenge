import { Criteria, EntityType, PaginateResult } from "../../bounded-context/type";
import { DatabaseModels, QueryTransaction } from "../db/type";
import { HttpRouter } from "./type";

export interface IEntity {
    validate(): Promise<boolean>
}

export interface IEntityFactory {
    create(type: EntityType, data: any): IEntity
}

export interface IRepository<TEntity> {
    paginate(criteria: Criteria): Promise<PaginateResult<TEntity>>;
    find(criteria: Criteria): Promise<TEntity[]>;
    findById(id: number, criteria?: Criteria): Promise<TEntity>;
    create(entity: TEntity, options?: { include?: any }): Promise<TEntity>;
    update(data: any, criteria?: Criteria): Promise<TEntity>;
    updateById(id: number, entity: TEntity): Promise<TEntity>;
    deleteById(id: number): Promise<undefined>;
    bulkCreate(entities: TEntity[]): Promise<TEntity[]>;
    bulkUpdate(criteria: Criteria, entities: any): Promise<TEntity[]>;
    bulkDelete(criteria: Criteria): Promise<undefined>;
    count(criteria: Criteria): Promise<number>;
    isExist(id: number): Promise<boolean>;
}

export interface IServer {
    start(): Promise<void>;
    stop(): Promise<void>;
}
export interface IRouter{
    route(): HttpRouter;
}
export interface IApplication{
    start() : Promise<void>;
}

export interface IErrorFactory {
    badRequestError(message: string, details?: any): IHttpError;
    notFoundError(message: string): IHttpError;
    unauthorizedError(message: string): IHttpError;
    internalServerError(message: string): IHttpError;
    forbiddenError(message: string): IHttpError;
}

export interface IHttpError extends Error {
    status: number;
    type: string;
    details: { [key: string]: any };
}

export interface IDatabase {
  getModels(): DatabaseModels;
  getTransaction(): Promise<QueryTransaction>;
}
