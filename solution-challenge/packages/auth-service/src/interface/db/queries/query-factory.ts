import { IQueryFactory } from "../interface";
import { CreateQuery } from "./create-query";
import { FindByIdQuery } from "./find-by-id-query";
import { FindQuery } from "./find-query";
import { UpdateQuery } from "./update-query";

//Factory to create Query with context
export default class QueryFactory implements IQueryFactory{
    public createFindQuery(ctx: any, model: any) {
        return new FindQuery(ctx, model)
    }
    public createFindByIdQuery(ctx: any, model: any): FindByIdQuery {
        return new FindByIdQuery(ctx, model)
    }
    createPaginateQuery(ctx: any, model: any) {
        throw new Error("Method not implemented.");
    }
    public createCreateQuery(ctx: any, model: any) : CreateQuery {
        return new CreateQuery(ctx, model);
    }

    public createUpdateQuery(ctx: any, model: any) : UpdateQuery {
        return new UpdateQuery(ctx, model)
    }

    createUpdateByIdQuery(ctx: any, model: any) {
        throw new Error("Method not implemented.");
    }
    createDeleteByIdQuery(ctx: any, model: any) {
        throw new Error("Method not implemented.");
    }
    createBulkCreateQuery(ctx: any, model: any) {
        throw new Error("Method not implemented.");
    }
    createBulkUpdateQuery(ctx: any, model: any) {
        throw new Error("Method not implemented.");
    }
    createBulkDeleteQuery(ctx: any, model: any) {
        throw new Error("Method not implemented.");
    }
    createCountQuery(ctx: any, model: any) {
        throw new Error("Method not implemented.");
    }
    
}