import { IHashcodeAtrributes } from "../../low-level/hashcode/hashcode-entity";
import { paginate } from "../queries/plugins/paginate";
import { DatabaseConnection, DatabaseDataTypes, DatabaseModel, DatabaseModelAttributes, ModelInstance } from "../type";

interface HashcodeInstance extends ModelInstance<IHashcodeAtrributes> {}

export const hashcodeModelFactory = (dbCon: DatabaseConnection): DatabaseModel<IHashcodeAtrributes> => {
  const attributes: DatabaseModelAttributes<HashcodeInstance> = {
    id: {
      type: DatabaseDataTypes.INTEGER,
      field: 'hash_id',
      autoIncrement: true,
      primaryKey: true
    },
    // userId: {
    //   type: DatabaseDataTypes.INTEGER,
    //   field: 'user_id',
    //   // allowNull: false
    // },
    key: {
      type: DatabaseDataTypes.STRING,
      field: 'key',
      allowNull: false
    },
    type: {
      type: DatabaseDataTypes.STRING,
      field: 'type',
      allowNull: false
    },
    expiredIn: {
      type: DatabaseDataTypes.DATE,
      field: 'expired_in',
      allowNull: false,
    },
    createdBy: {
      type: DatabaseDataTypes.INTEGER,
      field: 'created_by',
      // allowNull: false,
    },
    updatedBy: {
      type: DatabaseDataTypes.INTEGER,
      field: 'updated_by',
    },
    createdAt: {
      type: DatabaseDataTypes.DATE,
      field: 'created_at',
      // allowNull: false,
    },
    updatedAt: {
      type: DatabaseDataTypes.DATE,
      field: 'updated_at',
    }
  }
  const model = dbCon.define('hashcode', attributes, {
    tableName: 'hash_store',
    timestamps: true
  }) as DatabaseModel<IHashcodeAtrributes>;

  model.paginate = paginate;
  
  return model;
}