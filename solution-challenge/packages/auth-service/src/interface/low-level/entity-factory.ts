import { EntityType, EntityTypes } from "../../bounded-context/type";
import { Group } from "./group/group-entity";
import { Hashcode } from "./hashcode/hashcode-entity";
import { IEntity, IEntityFactory } from "./interface";
import { Permission } from "./permission/permission-entity";
import { Role } from "./role/role-entity";
import { UserProfile } from "./user-profile/user-profile-entity";
import { User } from "./user/user-entity";

export default class EntityFactory implements IEntityFactory {
    create(type: EntityType, data: any) :IEntity {
        switch (type) {
            case EntityTypes.User: return new User(data)

            case EntityTypes.UserPofile: return new UserProfile(data)
            
            case EntityTypes.Role: return new Role(data)

            case EntityTypes.Group: return new Group(data)

            case EntityTypes.Permission: return new Permission(data)

            case EntityTypes.Hashcode: return new Hashcode(data)

            default: throw new Error(`${type} is not supported.`)
        }
    }
}