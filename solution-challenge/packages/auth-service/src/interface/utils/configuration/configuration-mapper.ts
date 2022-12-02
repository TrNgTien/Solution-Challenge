import { Config } from "../../../bounded-context/type";
import { container } from "../../../container";
import { IObjectHelper } from "../helpers/helpers-interface";

export interface IConfigurationMapper {
    mapping(config: Object): Config
}

export default class ConfiguationMapper implements IConfigurationMapper{
    private objectHelper: IObjectHelper
    private readonly fields: string[]

    constructor() {
        this.objectHelper = container.resolve<IObjectHelper>('objectHelper')

        this.fields = ["http", "debug", "db", "smtp", "locale"]
    }

    public mapping(config: Object): Config {
        let result: Config = this.objectHelper.pick(config, this.fields)

        return <Config>this.objectHelper.omitByUndefined(result)
    }
}