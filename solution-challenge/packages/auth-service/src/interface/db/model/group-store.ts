
import { DatabaseConnection, DatabaseDataTypes, DatabaseModel, DatabaseModelAttributes, ModelInstance } from "../type";
import {paginate} from '../queries/plugins/paginate'

export interface IGroupStoreAttributes {
    groupId: number,
    roleId: number
}

interface GroupStoreInstance extends ModelInstance<IGroupStoreAttributes> {}

export const groupStoreModelFactory = (dbCon : DatabaseConnection) : DatabaseModel<IGroupStoreAttributes> => {
    const attributes: DatabaseModelAttributes<GroupStoreInstance> = {
       roleId : {
           type: DatabaseDataTypes.INTEGER,
           field: 'role_id',
           allowNull : false
       },
       groupId: {
           type: DatabaseDataTypes.INTEGER,
           field: 'group_id',
           allowNull : false
       }
    }
    const model = dbCon.define('groupStore', attributes, {
        tableName: 'auth_group_store',
        timestamps: true
    }) as DatabaseModel<IGroupStoreAttributes>;
    model.paginate = paginate;
    return model;
}