
import {
    Sequelize as DatabaseConnection,
    Transaction as QueryTransaction,
    WhereOptions,
    IncludeOptions,
    FindOptions,
    ModelAttributes as DatabaseModelAttributes,
    Model, 
    ModelCtor,
    Optional
  } from 'sequelize';
import { PaginateResult } from '../../bounded-context/type';

import * as Sequelize from 'sequelize';
import { Query } from './queries/query';

const DatabaseDataTypes = {
    ABSTRACT: Sequelize.ABSTRACT,
    STRING: Sequelize.STRING,
    CHAR: Sequelize.CHAR,
    TEXT: Sequelize.TEXT,
    NUMBER: Sequelize.NUMBER,
    TINYINT: Sequelize.TINYINT,
    SMALLINT: Sequelize.SMALLINT,
    MEDIUMINT: Sequelize.MEDIUMINT,
    INTEGER: Sequelize.INTEGER,
    BIGINT: Sequelize.BIGINT,
    FLOAT: Sequelize.FLOAT,
    TIME: Sequelize.TIME,
    DATE: Sequelize.DATE,
    DATEONLY: Sequelize.DATEONLY,
    BOOLEAN: Sequelize.BOOLEAN,
    NOW: Sequelize.NOW,
    BLOB: Sequelize.BLOB,
    DECIMAL: Sequelize.DECIMAL,
    UUID: Sequelize.UUID,
    UUIDV1: Sequelize.UUIDV1,
    UUIDV4: Sequelize.UUIDV4,
    HSTORE: Sequelize.HSTORE,
    JSON: Sequelize.JSON,
    JSONB: Sequelize.JSONB,
    VIRTUAL: Sequelize.VIRTUAL,
    ARRAY: Sequelize.ARRAY,
    ENUM: Sequelize.ENUM,
    RANGE: Sequelize.RANGE,
    REAL: Sequelize.REAL,
    DOUBLE: Sequelize.DOUBLE,
    'DOUBLE PRECISION': Sequelize['DOUBLE PRECISION'],
    GEOMETRY: Sequelize.GEOMETRY
};

//Db models according to Sequelize / typescript
type ModelExtends<TEntity = any> = {
    paginate: (query: Query) => Promise<PaginateResult<TEntity>>;
};

type ModelCreationAttributes<TEntity = any> = Optional<TEntity, keyof TEntity> 

interface ModelInstance<TEntity = any> extends Model<TEntity, ModelCreationAttributes<TEntity>> {}

type DatabaseModel<TEntity = any> = ModelCtor<Model<TEntity>> & ModelExtends<TEntity>


export {
    DatabaseConnection,
    DatabaseDataTypes,
    QueryTransaction,
    WhereOptions,
    IncludeOptions,
    FindOptions,
    DatabaseModelAttributes,
    ModelInstance,
    DatabaseModel,
    ModelExtends
};

export type DatabaseModels = {
    user? : DatabaseModel,
    userProfile?: DatabaseModel,
    group?: DatabaseModel,
    permission?: DatabaseModel,
    role?: DatabaseModel,
    roleStore?: DatabaseModel,
    groupStore?: DatabaseModel,
    permissionStore?: DatabaseModel,
    hashStore?: DatabaseModel
  };
  