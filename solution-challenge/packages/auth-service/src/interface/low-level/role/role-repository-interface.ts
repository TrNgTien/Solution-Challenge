import { Criteria } from '../../../bounded-context/type'
import { Group } from '../group/group-entity'
import { IRepository } from '../interface'
import { Role } from './role-entity'

//Method interface for Role Entity
export interface IRoleRepository extends IRepository<Role> {
    addGroups(roleIDs: Role[], groupIDs: Group[]): Promise<any>
    findRolesByUserId(id: number, criteria?: Criteria): Promise<Role[]>;
    // findByName(name: string, criteria?: Criteria): Promise<Role>;
    // getLastActiveAccountByUserId(id: number): Promise<Role>;
    // findByGroupId(groupId: number): Promise<Role[]>;
}

