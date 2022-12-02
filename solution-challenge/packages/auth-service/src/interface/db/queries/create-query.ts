import { Model } from "sequelize/types";
import { AppContext, Include } from "../../../bounded-context/type";
import { DatabaseModel } from "../type";

type CreateQueryOptions = {
    include? : Include;
}

export class CreateQuery{
    private model : DatabaseModel;
    private ctx : AppContext;
    constructor(ctx : AppContext , model: DatabaseModel){
        this.model = model;
        this.ctx = ctx;
    }
    public async execute<TEntity = any>(data : TEntity & {createdBy?: number} , options? : CreateQueryOptions) : Promise<Model<TEntity>> {
        if(!data) throw Error("Missing data")

        if(this.ctx.user && this.ctx.user.id)
            data.createdBy = this.ctx.user.id;

        const opts: any = {
            transaction :  await this.ctx.transaction
        }
        if(options && options.include)
            opts.include = options.include;
           
        return this.model.create(data, opts);
    }
}