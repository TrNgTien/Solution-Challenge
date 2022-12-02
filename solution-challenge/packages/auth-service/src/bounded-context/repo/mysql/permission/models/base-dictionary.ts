import { Permission } from "../../../../../interface/low-level/permission/permission-entity";
import { PermissionAction, PermissionOutput } from "./type";

export default abstract class BaseDictionary{
    protected action : PermissionAction[];
    protected output : PermissionOutput[];
    
    constructor(action : PermissionAction[] , output : PermissionOutput[]){
        this.action = action;
        this.output = output;
    }

  
    public compareAction(base: Permission , dest: Permission) : boolean {
        //COMP   .b.c.     USE <- true <--- Ng dung input

        //COMP.b.c.d.USE Da dc phan quyen
        //COMP.b.c.*.USE
        // ..... <-- Rat nhieu 
        return base.action === dest.action;
    }
    // public comparePermission(base: Permission , dest : Permission) : boolean{
    //     // return Boolean(this.compareType(base , dest) && this.compareAction(base , dest));
    // }
    
    public abstract translate(base: Permission, dest: Permission) : Promise<Boolean>;
    
    public abstract toString(triggerEvent : any) : string;
    public abstract fromString(triggerString : string) : any;

}