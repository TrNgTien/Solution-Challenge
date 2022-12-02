import { container } from "../../../../container";
import { DatabaseModel, DatabaseModels } from "../../../../interface/db/type";
import { Group } from "../../../../interface/low-level/group/group-entity";
import { IGroupRepository } from "../../../../interface/low-level/group/group-repository-interface";
import { IRoleRepository } from "../../../../interface/low-level/role/role-repository-interface";
import { AppContext, Criteria, Operators } from "../../../type";
import { BaseMySQLRepository } from "../base-mysql-repository";
import { IDataMapper } from "../interface";

export default class MySQLGroupRepository extends BaseMySQLRepository<Group> implements IGroupRepository {
    protected appContext: AppContext;
    protected model: DatabaseModel;
    protected mapper: IDataMapper<Group>

    private roleRepository: IRoleRepository

    constructor(
        dbModels: DatabaseModels,
        groupMapper: IDataMapper<Group>,
        appContext: AppContext,

    ) {
        super()
        this.appContext = appContext;
        this.model = dbModels.group;
        this.mapper = groupMapper;

        this.roleRepository = container.resolve<IRoleRepository>(`roleRepository`)

    }
    public async findByRoleId(id: number, criteria?: Criteria): Promise<Group[]> {
        const findQuery = this.queryFactory.createFindQuery(this.appContext, this.model)

        let select = null

        if(criteria && criteria.select) {
            select = criteria.select
        }

        const groups = await findQuery.execute<Group>({
            includes: [{
                field: 'roles',
                filters: [{ code: 'id', operator: Operators.Equals, value: id}]
            }],
            select
        })

        if(!groups || groups.length === 0) {
            return []
        }

        return groups.map(group => this.mapper.toEntity(group, select))
    }

    public async findByUserId(id: number, criteria?: Criteria): Promise<Group[]> {
        const roles = await this.roleRepository.findRolesByUserId(id)

        if(!roles || roles.length === 0) {
            return []
        }

        const finding = roles.map(async role => {
            const group = await this.findByRoleId(role.id, {select: ['id', 'name']})

            return group
        })

        const groupList = await Promise.all(finding)

        let groups: Group[] = []
        groupList.forEach(each => groups.push(...each))

        const filtered = this.arrayHelper.unique(groups, 'id')

        console.log(`filter: `, filtered)

        return filtered
    }
}
