
import { DatabaseModel, DatabaseModels } from "../../../../interface/db/type";
import { Role } from "../../../../interface/low-level/role/role-entity";
import { User } from "../../../../interface/low-level/user/user-entity";
import { IUserRepository } from "../../../../interface/low-level/user/user-repository-interface";
import { AppContext, Criteria, Operators } from "../../../type";
import { BaseMySQLRepository } from "../base-mysql-repository";
import { IDataMapper } from "../interface";


//Repos for User Entity
export default class MySQLUserRepository extends BaseMySQLRepository<User> implements IUserRepository{
    protected appContext: AppContext;
    protected model: DatabaseModel;
    protected mapper: IDataMapper<User>;
    
    private userRoleModel: DatabaseModel;

    constructor(
        
        dbModels: DatabaseModels,
        userMapper: IDataMapper<User>,
        appContext: AppContext,

    ) {
        super()

        this.appContext = appContext;
        this.model = dbModels.user;
        this.mapper = userMapper;
        this.userRoleModel = dbModels.roleStore;

    } 


    public async findByEmail(email: string, criteria?: Criteria): Promise<User> {
        let select = null;
        let includes = null;
        if (criteria && criteria.select) {
            select = criteria.select
        }
        if (criteria && criteria.includes) {
            includes = criteria.includes
        }

        const findQuery = await this.queryFactory.createFindQuery(this.appContext, this.model)
        
        const users = await findQuery.execute<User>({
            filters: [
                {
                    code: 'email',
                    operator: Operators.Equals,
                    value: email
                }
            ],
            select,
            includes
        });

        if(!users || users.length < 1) {
            return null
        }

        return this.mapper.toEntity(users[0], select)
    }

    public async addRoles(userIDs: User[], rolesIDs: Role[]): Promise<void> {
        const users = userIDs.map(async user => {
            const roles = rolesIDs.map(async role => {       
                const data = {userId: user.id, roleId: role.id}

                const isExisted = await this.userRoleModel.findOne({ where: data })
                if (isExisted) {
                    throw this.errorFactory.badRequestError(`This user ${user.email} have this roleID ${role.name} already.`)
                }

                await this.userRoleModel.create(data, {transaction: await this.appContext.transaction})
            })

            const solved =  await Promise.all(roles)

            return solved

        })

        await Promise.all(users)
    }
} 