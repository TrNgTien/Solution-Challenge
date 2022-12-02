import { Criteria } from "../../../bounded-context/type";
import { IRepository } from "../interface";
import { UserProfile } from "./user-profile-entity";

export interface IUserProfileRepository extends IRepository<UserProfile> {
    findByUserId(id: number, criteria?: Criteria): Promise<UserProfile>
}