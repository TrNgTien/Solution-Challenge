import { IPermissionAttributes } from "../../low-level/permission/permission-entity";
import { DatabaseConnection, DatabaseDataTypes, DatabaseModel, DatabaseModelAttributes, ModelInstance } from "../type";
import {paginate} from '../queries/plugins/paginate'
import { IGroupAttributes } from "../../low-level/group/group-entity";

export interface GroupInstance extends ModelInstance<IGroupAttributes> {}

export const groupModelFactory = (dbCon : DatabaseConnection) : DatabaseModel<IGroupAttributes> => {
    const attributes: DatabaseModelAttributes<GroupInstance> = {
        id: {
            type: DatabaseDataTypes.INTEGER,
            field: 'group_id',
            autoIncrement: true,
            primaryKey: true
        },
        name : {
            type: DatabaseDataTypes.STRING,
            field: 'group_name',
            allowNull: false
        }
    }
    const model = dbCon.define('group', attributes, {
        tableName: 'auth_group',
        timestamps: true
    }) as DatabaseModel<IGroupAttributes>;

    model.paginate = paginate;
    return model;
}