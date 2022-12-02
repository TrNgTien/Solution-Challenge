import { DatabaseModel, DatabaseModels } from "../../../../interface/db/type";
import { UserProfile } from "../../../../interface/low-level/user-profile/user-profile-entity";
import { IUserProfileRepository } from "../../../../interface/low-level/user-profile/user-profile-repository-interface";
import { AppContext, Criteria, Operators } from "../../../type";
import { BaseMySQLRepository } from "../base-mysql-repository"
import { IDataMapper } from "../interface";

export default class UserProfileRepository extends BaseMySQLRepository<UserProfile> implements IUserProfileRepository {
    protected appContext: AppContext
    protected model: DatabaseModel
    protected mapper: IDataMapper<UserProfile>

    constructor(

        dbModels: DatabaseModels,
        userProfileMapper: IDataMapper<UserProfile>,
        appContext: AppContext

    ) {
        super()    

        this.appContext = appContext,
        this.model = dbModels.userProfile,
        this.mapper = userProfileMapper
    }

    public async findByUserId(id: number, criteria?: Criteria): Promise<UserProfile> {
        const findQuery = await this.queryFactory.createFindQuery(this.appContext, this.model)

        let select = null

        if (criteria && criteria.select) {
            select = criteria.select
        }

        const profile = await findQuery.execute<UserProfile>({
            filters: [{
                code: 'userId',
                operator: Operators.Equals,
                value: id
            }]
        })

        if(profile.length === 0) {
            return null
        }
        
        return this.mapper.toEntity(profile[0], select)
    }
}