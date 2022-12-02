import { Criteria } from "../../../bounded-context/type";
import { IRepository } from "../interface";
import { Group } from "./group-entity";

export interface IGroupRepository extends IRepository<Group> {
    findById(id: number , criteria ?: Criteria) : Promise<Group>
    findByRoleId(id : number , criteria?: Criteria) : Promise<Group[]>
    findByUserId(id : number , criteria?: Criteria) : Promise<Group[]>
}