import { DatabaseModel, DatabaseModels } from "../../../../interface/db/type";
import { Group } from "../../../../interface/low-level/group/group-entity";
import { Role } from "../../../../interface/low-level/role/role-entity";
import { IRoleRepository } from "../../../../interface/low-level/role/role-repository-interface";
import { User } from "../../../../interface/low-level/user/user-entity";
import { AppContext, Criteria, Operators } from "../../../type";
import { BaseMySQLRepository } from "../base-mysql-repository";
import { IDataMapper } from "../interface";

export default class MySQLRoleRepository extends BaseMySQLRepository<Role> implements IRoleRepository {
    protected appContext: AppContext;
    protected model: DatabaseModel;
    protected mapper: IDataMapper<Role>;

    private roleGroupModel: DatabaseModel

    constructor(
        dbModels: DatabaseModels,
        roleMapper: IDataMapper<Role>,
        appContext: AppContext,

    ) {
        super()
        this.appContext = appContext;
        this.model = dbModels.role;
        this.mapper = roleMapper;
        this.roleGroupModel = dbModels.groupStore;
    }

    public async addGroups(roleIDs: Role[], groupIDs: Group[]): Promise<void> {
        const roles = roleIDs.map(async role => {
            const groups = groupIDs.map(async group => {
                const data = {roleId: role.id, groupId: group.id}

                const isExisted = await this.roleGroupModel.findOne({where: data})
                if(isExisted) {
                    throw this.errorFactory.badRequestError(`This role ${role.name} have this groupID ${group.name} already.`)
                }

                await this.roleGroupModel.create(data, {transaction: (await this.appContext.transaction)})
            })

            const solved =  await Promise.all(groups)

            return solved
        })

        await Promise.all(roles)

        console.log(`pass`)
    }

    public async findRolesByUserId(id: number, criteria?: Criteria): Promise<Role[]> {
        const rolesQuery = this.queryFactory.createFindQuery(this.appContext, this.model)

        let select = null

        if(criteria && criteria.select) {
            select = criteria.select
        }

        const roles = await rolesQuery.execute<Role>({
            includes: [{
                field: 'users',
                filters: [{code: 'id', operator: Operators.Equals, value: id}]
            },
            { field: 'groups'}
        ]
        })

        if (roles.length === 0) {
            return []
        }

        return roles.map(role => this.mapper.toEntity(role, select))
    }
}