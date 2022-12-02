import { FindOptions, IncludeOptions, QueryTransaction, WhereOptions } from "../type";
import { Query } from "./query";

export class QueryBuilder{
    private query: FindOptions<any> = {};

    public setAttributes(attributes : string[]) : QueryBuilder{
        this.query.attributes = attributes;
        return this;
    }
    public setWhere(where : WhereOptions<any>): QueryBuilder{
        this.query.where = where;
        return this;
    }
    public setLimit(limit : number): QueryBuilder{
        this.query.limit = limit || 10;
        return this;
    }
    public setOrder(order: [[string , string]]) : QueryBuilder {
        this.query.order = order;
        return this;
    }
    public setOffset(offset : number) : QueryBuilder{
        this.query.offset = offset;
        return this;
    }
    public setInclude(include: IncludeOptions[]) : QueryBuilder{
        this.query.include = include;
        return this;
    }
    public setTransaction(transaction: QueryTransaction) : QueryBuilder{
        this.query.transaction = transaction;
        return this;
    }
    public build() : Query{
        return new Query(this.query);
    }

}