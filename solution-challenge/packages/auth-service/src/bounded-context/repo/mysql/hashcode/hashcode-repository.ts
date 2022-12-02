import { DatabaseModel, DatabaseModels } from "../../../../interface/db/type";
import { Hashcode } from "../../../../interface/low-level/hashcode/hashcode-entity";
import { IHashcodeRepository } from "../../../../interface/low-level/hashcode/hashcode-repository-interface";

import { AppContext } from "../../../type";
import { BaseMySQLRepository } from "../base-mysql-repository";
import { IDataMapper } from "../interface";

export default class MySQLHashCodeRepository extends BaseMySQLRepository<Hashcode> implements IHashcodeRepository {
    protected appContext: AppContext;
    protected model: DatabaseModel;
    protected mapper: IDataMapper<Hashcode>;

    constructor(
        dbModels: DatabaseModels,
        hashcodeMapper: IDataMapper<Hashcode>,
        appContext: AppContext
    ) {
        super()

        this.model = dbModels.hashStore;
        this.mapper = hashcodeMapper;
        this.appContext = appContext
    }
}