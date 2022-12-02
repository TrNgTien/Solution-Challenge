
import { IUserProfileAttributes } from "../../low-level/user-profile/user-profile-entity";
import { paginate } from "../queries/plugins/paginate";
import { DatabaseConnection, DatabaseDataTypes,  DatabaseModel,  DatabaseModelAttributes, ModelInstance } from "../type";

interface UserProfileInstance extends ModelInstance<IUserProfileAttributes> {}


export const userProfileModelFactory = (dbCon: DatabaseConnection): DatabaseModel<IUserProfileAttributes> => {
    const attributes: DatabaseModelAttributes<UserProfileInstance> = {
        id: {
            type: DatabaseDataTypes.INTEGER,
            field: 'id',
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DatabaseDataTypes.INTEGER,
            field: 'user_id',
            allowNull: false 
        },
        firstName: {
            type: DatabaseDataTypes.STRING,
            field: 'first_name',
            allowNull: true,
        },
        lastName: {
            type: DatabaseDataTypes.STRING,
            field: 'last_name',
            allowNull: true,
        },
        gender: {
            type: DatabaseDataTypes.STRING,
            field: 'gender',
            allowNull: true
        },
        birthday: {
            type: DatabaseDataTypes.DATE,
            field: 'birthday',
            allowNull: true
        },
        phone: {
            type: DatabaseDataTypes.STRING,
            field: 'phone',
            allowNull: true,
        },
        address: {
            type: DatabaseDataTypes.STRING,
            field: 'address',
            allowNull: true
        },
        job: {
            type: DatabaseDataTypes.STRING,
            field: 'job',
            allowNull: true
        },
        company: {
            type: DatabaseDataTypes.STRING,
            field: 'company',
            allowNull: true,
        },
        academicLevel: {
            type: DatabaseDataTypes.STRING,
            field: 'academic_level',
            allowNull: true
        },
        bachelor: {
            type: DatabaseDataTypes.STRING,
            field: 'bachelor',
            allowNull: true
        }
    }
    
    const model = dbCon.define('profile', attributes, {
        tableName: 'auth_user_profile'
    }) as DatabaseModel<IUserProfileAttributes> 

    model.paginate = paginate
    
    return model;
}