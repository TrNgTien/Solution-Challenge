import config from 'config'
import { Config } from '../../../bounded-context/type'

import { container } from '../../../container'
import { IConfigurationMapper } from './configuration-mapper'

export interface IConfiguration {
    get(setting: string): Config | undefined;
    has(setting: string): boolean;
}


export default class Configuration implements IConfiguration {
    protected config: config.IConfig
    private configurationMapper: IConfigurationMapper

    constructor() {
        this.config = config

        this.configurationMapper = container.resolve<IConfigurationMapper>(`configurationMapper`)
    }

    public get(setting: string): Config | undefined {
        try {
            return this.configurationMapper.mapping(this.config.get(setting));
        }
        catch (error) { return; }
    }

    public has(setting: string): boolean {
        return this.config.has(setting)
    }
}