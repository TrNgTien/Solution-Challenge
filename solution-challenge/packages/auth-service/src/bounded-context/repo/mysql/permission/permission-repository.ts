
import { container } from "../../../../container";
import { DatabaseModel, DatabaseModels } from "../../../../interface/db/type";
import { Group } from "../../../../interface/low-level/group/group-entity";
import { IGroupRepository } from "../../../../interface/low-level/group/group-repository-interface";
import { Permission } from "../../../../interface/low-level/permission/permission-entity";
import { IPermissionRepository } from "../../../../interface/low-level/permission/permission-repository-interface";
import { AppContext, Criteria, Filter, Operators } from "../../../type";
import { BaseMySQLRepository } from "../base-mysql-repository";
import { IDataMapper } from "../interface";


export default class MySQLPermissionRepository extends BaseMySQLRepository<Permission> implements IPermissionRepository {
    protected model: DatabaseModel;
    protected mapper: IDataMapper<any>;
    protected appContext: AppContext;

    protected groupRepository: IGroupRepository;
    protected permissionGroupModel: DatabaseModel;

    constructor(
        dbModels: DatabaseModels,
        permissionMapper: IDataMapper<Permission>,
        appContext: AppContext
    ) {
        super()

        this.appContext = appContext;
        this.model = dbModels.permission;
        this.mapper = permissionMapper;

        this.permissionGroupModel = dbModels.permissionStore

        this.groupRepository = container.resolve<IGroupRepository>(`groupRepository`)

    }
    public async findByGroupId(id: number, criteria?: Criteria): Promise<Permission[]> {
        const findQuery = this.queryFactory.createFindQuery(this.appContext, this.model)

        const permissions = await findQuery.execute<Permission>({
            includes: [{
                field: 'groups',
                filters: [{ code: 'id', operator: Operators.Equals, value: id }]
            }]
        })

        if (!permissions || permissions.length === 0) {
            return []
        }

        return permissions.map(permission => this.mapper.toEntity(permission))
    }

    public async findByRoleId(id: number, criteria?: Criteria): Promise<Permission[]> {
        const groups = await this.groupRepository.findByRoleId(id)

        if (!groups || groups.length === 0) {
            return []
        }

        let permissions: Permission[] = []

        groups.forEach(async (group) => {
            const permission = await this.findByGroupId(group.id)
            permissions.push(...permission)

        })

        return permissions.map(permission => this.mapper.toEntity(permission))
    }

    public async findByUserId(id: number, criteria?: Criteria): Promise<Permission[]> {
        const groups = await this.groupRepository.findByUserId(id)

        let select = null
        if (criteria && criteria.select) {
            select = criteria.select
        }

        if (!groups || groups.length === 0) {
            return []
        }

        const finding = groups.map(async (group) => {
            const permission = await this.findByGroupId(group.id)
            console.log(permission)
            
            return permission
        })

        const solved = await Promise.all(finding)

        
        let permissions: Permission[] = []

        solved.forEach(permissionList => permissions.push(...permissionList))

        permissions = this.arrayHelper.unique(permissions, 'id')

        return permissions.map(permission => this.mapper.toEntity(permission, select))
    }

    public async findPermission(permission: {
        type: string;
        action: string;
        key: string;
        signal?: string;
    }, criteria?: Criteria): Promise<Permission[]> {

        let select = null
        let includes = null

        let filters: Filter[] = [
            {
                code: 'permission_type',
                operator: Operators.Equals,
                value: permission.type
            },
            {
                code: 'permission_action',
                operator: Operators.Equals,
                value: permission.type
            },
            {
                code: 'permission_key',
                operator: Operators.Equals,
                value: permission.type
            },
        ]
        if (permission.signal) {
            filters.push({
                code: 'permission_signal',
                operator: Operators.Equals,
                value: permission.signal
            })
        }

        if (criteria && criteria.filters) {
            filters = criteria.filters
        }

        if (criteria && criteria.includes) {
            includes = criteria.includes
        }
        if (criteria && criteria.select) {
            select = criteria.select
        }

        const findQuery = this.queryFactory.createFindQuery(this.appContext, this.model)

        const permissions = await findQuery.execute<Permission>({ filters, select, includes })

        return permissions.map(permission => this.mapper.toEntity(permission, select))
    }

    public async addGroups(permissionIDs: Permission[], groupIDs: Group[]): Promise<void> {
        const permissions = permissionIDs.map(async permission => {
            const groups = groupIDs.map(async group => {
                const data = {permissionId: permission.id, groupId: group.id}

                const isExisted = await this.permissionGroupModel.findOne({where: data})
                if(isExisted) {
                    throw this.errorFactory.badRequestError(`This GroupID ${group} has this PermissionID ${permission} already.`)
                }

                await this.permissionGroupModel.create(data, { transaction: await this.appContext.transaction })
            })

            const solved = await Promise.all(groups)

            return solved            
        })

        await Promise.all(permissions)
    }
}
