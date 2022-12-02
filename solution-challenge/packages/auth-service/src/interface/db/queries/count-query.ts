import { AppContext, Criteria } from "../../../bounded-context/type";
import { DatabaseModel } from "../type";
import { QueryParser } from "./query-parser";

export class CountQuery{
    private model: DatabaseModel
    private ctx : AppContext;
    constructor(ctx : AppContext, model: DatabaseModel){
        this.ctx = ctx;
        this.model = model;
    }
    // public async execute(critiera : Criteria) : Promise<number> {
    //     if(!critiera) throw Error("Missing critieria");
    //     const query = QueryParser.parse(critiera);
        
    // }
    
}