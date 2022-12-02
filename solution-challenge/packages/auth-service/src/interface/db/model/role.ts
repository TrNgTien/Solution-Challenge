import { DatabaseConnection, DatabaseDataTypes, DatabaseModel, DatabaseModelAttributes, ModelInstance } from "../type";
import { paginate } from '../queries/plugins/paginate'
import { IRoleAttributes } from "../../low-level/role/role-entity";

export interface RoleInstance extends ModelInstance<IRoleAttributes> { }

export const roleModelFactory = (dbCon: DatabaseConnection): DatabaseModel<IRoleAttributes> => {
    const attributes: DatabaseModelAttributes<RoleInstance> = {
        id: {
            type: DatabaseDataTypes.INTEGER,
            field: 'role_id',
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DatabaseDataTypes.STRING,
            field: 'role_name',
            allowNull: false
        }
    }
    const model = dbCon.define('role', attributes, {
        tableName: 'auth_role',
        timestamps: true
    }) as DatabaseModel<IRoleAttributes>

    model.paginate = paginate

    return model;
}