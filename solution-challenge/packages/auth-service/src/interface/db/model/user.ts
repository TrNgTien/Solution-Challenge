import { DatabaseConnection, DatabaseDataTypes, DatabaseModel, DatabaseModelAttributes, ModelInstance } from "../type";
import { paginate } from '../queries/plugins/paginate'
import { IUserAttributes } from "../../low-level/user/user-entity";

interface UserInstance extends ModelInstance<IUserAttributes> {}

export const userModelFactory = (dbCon: DatabaseConnection): DatabaseModel<IUserAttributes> => {
  const attributes: DatabaseModelAttributes<UserInstance> = {
    id: {
      type: DatabaseDataTypes.INTEGER,
      field: 'user_id',
      autoIncrement: true,
      primaryKey: true
    },
    firstName: {
      type: DatabaseDataTypes.STRING,
      field: 'first_name',
      allowNull: false,
    },
    lastName: {
      type: DatabaseDataTypes.STRING,
      field: 'last_name',
      allowNull: false,
    },
    email: {
      type: DatabaseDataTypes.STRING,
      field: 'email',
      allowNull: false,
      unique: true,
    },
    password: {
      type: DatabaseDataTypes.STRING,
      field: 'password',
      allowNull: true,
    },
    status: {
      type: DatabaseDataTypes.INTEGER,
      field: 'status',
      allowNull: false,
      defaultValue: 1,
    },
    accountType: {
      type: DatabaseDataTypes.STRING,
      field: 'account_type',
      allowNull: true,
    },
    uuid: {
      type: DatabaseDataTypes.STRING,
      field: 'uuid',
      allowNull: true,
    },
    createdBy: {
      type: DatabaseDataTypes.INTEGER,
      field: 'created_by',
      allowNull: false,
    },
    updatedBy: {
      type: DatabaseDataTypes.INTEGER,
      field: 'updated_by',
    },
    createdAt: {
      type: DatabaseDataTypes.DATE,
      field: 'created_at',
      allowNull: false,
    },
    updatedAt: {
      type: DatabaseDataTypes.DATE,
      field: 'updated_at',
    }
  }
  const model = dbCon.define('user', attributes, {
    tableName: 'auth_user',
  }) as DatabaseModel<IUserAttributes>;
  
  model.paginate = paginate
  
  return model;
}