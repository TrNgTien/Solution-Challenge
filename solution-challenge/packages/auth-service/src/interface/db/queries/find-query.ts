import { Model } from "sequelize/types";
import { AppContext, Criteria } from "../../../bounded-context/type";
import { DatabaseModel } from "../type";
import { QueryParser } from "./query-parser";


export class FindQuery{
    private model : DatabaseModel;
    private ctx : AppContext;

    constructor(ctx : AppContext , model : DatabaseModel){
        this.ctx = ctx;
        this.model = model
    }
    public async execute<TEntity = any> (criteria : Criteria) : Promise<Model<TEntity>[]> {
        if(!criteria)
            throw Error("Missing criteria")
            
        const query = QueryParser.parse(criteria)

        return this.model.findAll(query.options);
    }
}