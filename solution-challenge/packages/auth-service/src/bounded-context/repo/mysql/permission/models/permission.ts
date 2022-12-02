import { Permission } from "../../../../../interface/low-level/permission/permission-entity";
import { APIDictionaryFactory } from "./dictionaries/api-dictionary";
import { COMPDictionaryFactory } from "./dictionaries/comp-dictionary";
import { IPermissionModel } from "./interface";

export default class PermissionFactory{
    private models : any;
    constructor() { 
        let model = {
            api : new APIDictionaryFactory(),
            comp: new COMPDictionaryFactory()
        }
        this.models = model;
    }
    public resolveModel(p : Permission){
        return this.models[p.type]; 
    }

}