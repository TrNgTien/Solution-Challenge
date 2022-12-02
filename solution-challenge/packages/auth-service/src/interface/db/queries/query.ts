import { container } from "../../../container";
import { IObjectHelper } from "../../utils/helpers/helpers-interface";
import { FindOptions } from "../type";

export class Query {
  public options: FindOptions<any>;
  private objectHelper: IObjectHelper;

  constructor(options?: FindOptions<any>) {
    this.objectHelper = container.resolve<IObjectHelper>('objectHelper');

    this.options = options || { where: {} };
  }

  public addCondition(condition: any) : void {
    if(!this.options.where)
      this.options.where = {}

    this.objectHelper.extend(this.options.where , condition)
  }

  public appendAnd(key : string, value: any) : void {
    if(!this.options.where)
      this.options.where = {}
      
    if(this.options.where[key]){
      this.options.where = {$and : [this.options.where , value]}
    }else 
      this.objectHelper.extend(this.options.where , value);
  }

  public appendOr(key : string , value : any) : void {
    if(!this.options.where)
      this.options.where = {}
    
    if(this.options.where[key]){
      const oldVal = this.objectHelper.clone(this.options.where[key]);
      delete this.options.where[key];
      this.objectHelper.extend(this.options.where , {
        $or : [this.objectHelper.set({} , key , oldVal) , value]
      })
    }else {
      this.objectHelper.extend(this.options.where , value);
    }
  }
}
