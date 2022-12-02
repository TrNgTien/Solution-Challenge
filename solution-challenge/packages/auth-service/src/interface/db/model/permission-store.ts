import { DatabaseConnection, DatabaseDataTypes, DatabaseModel, DatabaseModelAttributes, ModelInstance } from "../type";
import {paginate} from '../queries/plugins/paginate'

export interface IPermissionStoreAttributes {
    permissionId: number,
    groupId: number
}

interface PermissionStoreInstance extends ModelInstance<IPermissionStoreAttributes> {}

export const permissionStoreModelFactory = (dbCon : DatabaseConnection) : DatabaseModel<IPermissionStoreAttributes> => {
    const attributes: DatabaseModelAttributes<PermissionStoreInstance> = {
       permissionId: {
           type: DatabaseDataTypes.INTEGER,
           field: 'permssion_id'
       },
       groupId : {
           type: DatabaseDataTypes.INTEGER,
           field: 'group_id'
       }
    }
    const model = dbCon.define('permissionStore', attributes, {
        tableName: 'auth_permission_store',
        timestamps: true
    }) as DatabaseModel<IPermissionStoreAttributes>;

    model.paginate = paginate;

    return model;
}