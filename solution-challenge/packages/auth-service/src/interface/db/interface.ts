import { AppContext } from "../../bounded-context/type";
import { CreateQuery } from "./queries/create-query";
import { FindByIdQuery } from "./queries/find-by-id-query";
import { FindQuery } from "./queries/find-query";
import { UpdateQuery } from "./queries/update-query";
import { DatabaseModel } from "./type";

// Query Factory Interface for injections and standard methods.
export interface IQueryFactory {
    createFindQuery(ctx: AppContext, model: DatabaseModel): FindQuery;
    createFindByIdQuery(ctx: AppContext, model: DatabaseModel): FindByIdQuery;
    createPaginateQuery(ctx: AppContext, model: DatabaseModel): any //PaginateQuery;
    createCreateQuery(ctx: AppContext, model: DatabaseModel): CreateQuery;
    createUpdateQuery(ctx: AppContext, model: DatabaseModel): UpdateQuery;
    createUpdateByIdQuery(ctx: AppContext, model: DatabaseModel): any //UpdateByIdQuery;
    createDeleteByIdQuery(ctx: AppContext, model: DatabaseModel): any //DeleteByIdQuery;
    createBulkCreateQuery(ctx: AppContext, model: DatabaseModel): any //BulkCreateQuery;
    createBulkUpdateQuery(ctx: AppContext, model: DatabaseModel): any //BulkUpdateQuery;
    createBulkDeleteQuery(ctx: AppContext, model: DatabaseModel): any //BulkDeleteQuery;
    createCountQuery(ctx: AppContext, model: DatabaseModel): any //CountQuery;
  }
  