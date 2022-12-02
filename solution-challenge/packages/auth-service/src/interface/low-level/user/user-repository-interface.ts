import { IRepository } from "../interface";
import { Criteria } from "../../../bounded-context/type";
import { User } from "./user-entity";
import { Role } from "../role/role-entity";


//methods interface for User 
export interface IUserRepository extends IRepository<User> {
  findByEmail(email: string, criteria?: Criteria): Promise<User>;
  addRoles(userIDs: User[], rolesIDs: Role[]): Promise<void>
  // getLastActiveAccountByUserId(id: number): Promise<Account>;
  //getPermissions(id: number, accountId: number): Promise<Permission[]>;
  // hasPermission(id: number, accountId: number, permissionId: number): Promise<boolean>;
  // findByAccountId(accountId: number): Promise<User[]>;
}