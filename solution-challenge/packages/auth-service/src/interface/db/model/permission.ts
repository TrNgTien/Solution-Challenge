import { IPermissionAttributes } from "../../low-level/permission/permission-entity";
import { DatabaseConnection, DatabaseDataTypes, DatabaseModel, DatabaseModelAttributes, ModelInstance } from "../type";
import {paginate} from '../queries/plugins/paginate'

export interface PermissionInstance extends ModelInstance<IPermissionAttributes> {}

export const permissionModelFactory = (dbCon : DatabaseConnection) : DatabaseModel<IPermissionAttributes> => {
    const attributes: DatabaseModelAttributes<PermissionInstance> = {
        id: {
            type: DatabaseDataTypes.INTEGER,
            field: 'permission_id',
            autoIncrement: true,
            primaryKey: true
        },
        type : {
            type: DatabaseDataTypes.STRING,
            field : 'permission_type',
            allowNull: false
        },
        action: {
            type: DatabaseDataTypes.STRING,
            field: 'permission_action',
            allowNull : false
        },
        key : {
            type: DatabaseDataTypes.STRING,
            field: 'permission_key',
            allowNull: false
        },
        signal: {
            type: DatabaseDataTypes.STRING,
            field: 'permission_signal',
            allowNull: true
        }
    }
    const model = dbCon.define('permission', attributes, {
        tableName: 'auth_permissions',
        timestamps: true
    }) as DatabaseModel<IPermissionAttributes>;

    model.paginate = paginate;
    
    return model;
}