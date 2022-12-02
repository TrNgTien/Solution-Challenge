import { DatabaseConnection, DatabaseDataTypes, DatabaseModel, DatabaseModelAttributes, ModelInstance } from "../type";
import {paginate} from '../queries/plugins/paginate'

export interface IRoleStoreAttributes {
    roleId : number,
    userId: number
}

export interface RoleStoreInstnace extends ModelInstance<IRoleStoreAttributes> {}

export const roleStoreModelFactory = (dbCon : DatabaseConnection) : DatabaseModel<IRoleStoreAttributes> => {
    const attributes: DatabaseModelAttributes<RoleStoreInstnace> = {
       roleId : {
           type: DatabaseDataTypes.INTEGER,
           field: 'role_id',                
           allowNull : false
       },
       userId: {
           type: DatabaseDataTypes.INTEGER,
           field: 'user_id',
           allowNull : false
       }
    }
    const model = dbCon.define('roleStore', attributes, {
        tableName: 'auth_role_store',
        timestamps: true
    }) as DatabaseModel<IRoleStoreAttributes>

    model.paginate = paginate;
    
    return model;
}