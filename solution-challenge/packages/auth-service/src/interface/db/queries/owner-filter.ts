import { AppContext, EntityStatuses } from "../../../bounded-context/type";
import { Query } from "./query";

export class OwnerFilter {
    public static append(ctx : AppContext , domain: string , query : Query){
        if(!ctx)
            throw Error("Missing context")
        if(!domain)
            throw Error("Missing table name")
        if(!query)
            throw Error("Missing query")
        const isLogin = ctx.user && ctx.user.id;
        //Filtering later
        
    }
}