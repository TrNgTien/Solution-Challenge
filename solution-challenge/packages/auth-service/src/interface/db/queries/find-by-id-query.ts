import { Model } from "sequelize/types";
import { AppContext, Criteria } from "../../../bounded-context/type";
import { DatabaseModel } from "../type";
import { QueryParser } from "./query-parser";

export class FindByIdQuery{
    private model : DatabaseModel
    private ctx : AppContext
    
    constructor(ctx : AppContext , model : DatabaseModel){
        this.ctx = ctx;
        this.model = model;
    }
    
    public async execute<TEntity = any> (id: number, criteria?: Criteria) : Promise<Model<TEntity>> {
        if(!id)
            throw Error("Missing id");
        
        const args : Criteria = {
            filters : [
                {
                    code: 'id', 
                    operator: 'is', 
                    value: [id]
                }
            ]
        }
        if(criteria){
            if(criteria.select) 
                args.select = criteria.select;
            if(criteria.includes)
                args.includes = criteria.includes
            if(criteria.transaction)
                args.transaction = criteria.transaction 
        }
        const query = QueryParser.parse(args)
        
        return this.model.findOne(query.options);
    }
}