import { IDatabase } from "../low-level/interface";
import { DatabaseModels } from "./type";

import {Sequelize} from 'sequelize'
import { Config } from "../../bounded-context/type";
import { userModelFactory } from "./model/user";
import { roleModelFactory } from "./model/role";
import { permissionModelFactory } from "./model/permission";
import { groupModelFactory } from "./model/group";
import { groupStoreModelFactory } from "./model/group-store";
import { permissionStoreModelFactory } from "./model/permission-store";
import { roleStoreModelFactory } from "./model/role-store";
import { hashcodeModelFactory } from "./model/hashcode";
import { userProfileModelFactory } from "./model/user-profile";


export class Database implements IDatabase {

    private conn : Sequelize;
    /**
        @injected Config from awilix container
    */
    constructor(config : Config){
        const dbConfig = config.db;
        try{
            this.conn = new Sequelize(dbConfig.name, dbConfig.user , dbConfig.pass, {
                host: dbConfig.host,
                native: true,
                dialect: 'mysql',
                pool : {
                    max: 1000,
                    min: 0,
                    acquire: 30000,
                    idle: 10000
                }
            })
            this.conn.authenticate();
            console.log(`[DB] Connectied to DB at ${dbConfig.host}/${dbConfig.name}`)
        }catch(err) {
            console.log(err)
        }
    }

    //Sumarize all the db models
    public getModels(): DatabaseModels {
        let models = {
            user: userModelFactory(this.conn),
            userProfile: userProfileModelFactory(this.conn),
            role: roleModelFactory(this.conn),
            permission: permissionModelFactory(this.conn),
            group: groupModelFactory(this.conn),
            groupStore: groupStoreModelFactory(this.conn),
            permissionStore: permissionStoreModelFactory(this.conn),
            roleStore: roleStoreModelFactory(this.conn),
            hashStore: hashcodeModelFactory(this.conn),
        }
        models = <any> this.initAssociations(models);
        
        this.conn.sync({force: true});
       
        return models;
    }
    //Init the links between each table
    protected initAssociations(models : DatabaseModels): DatabaseModels {
        models.role.belongsToMany(models.user, {
            through: models.roleStore
        })
        models.user.belongsToMany(models.role, {
            through: models.roleStore
        })

        models.user.hasOne(models.userProfile, {
            foreignKey: 'user_id'
        })

        models.group.belongsToMany(models.role , {
            through : models.groupStore
        })
        models.role.belongsToMany(models.group , {
            through : models.groupStore
        })

        models.permission.belongsToMany(models.group , {
            through: models.permissionStore
        })
        models.group.belongsToMany(models.permission , {
            through: models.permissionStore
        })
        
        models.user.hasMany(models.hashStore)


        Object.keys(models).forEach(modelName => {
            if (models[modelName].associate) {
              models[modelName].associate(models);
            }
        });
        return models;
    }

    //Get transaction of Sequelize
    public async getTransaction(): Promise<any> {
        return await this.conn.transaction();
    }
    
}