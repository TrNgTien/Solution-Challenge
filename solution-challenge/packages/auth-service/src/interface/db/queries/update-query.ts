import { AppContext, Criteria } from "../../../bounded-context/type";
import { DatabaseModel } from "../type";
import { QueryParser } from "./query-parser";

export class UpdateQuery {
    private model: DatabaseModel;
    private ctx: AppContext;

    constructor(ctx: AppContext, model: DatabaseModel) {
        this.model = model,
        this.ctx = ctx
    }

    public async execute<TEntity = any>(criteria: Criteria, data: TEntity & {updatedAt?: Date, updatedBy?: Number}) {
        if (!criteria) {
            throw Error(`missing Criteria`)
        }
        if (Object.keys(data).length === 0) {
            throw Error(`missing Data`)
        }

        const query = QueryParser.parse(criteria)

        data.updatedAt = new Date();
        
        return this.model.update(data, {
            where: query.options.where,
            transaction: this.ctx.transaction
        })
    }
}