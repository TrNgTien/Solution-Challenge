import fs from 'fs'

import { Config } from "../../../bounded-context/type";
import { container } from "../../../container";
import { IObjectHelper } from '../../utils/helpers/helpers-interface';

export type LocaleFile = LocaleFiles.LOG_IN_LOCALE

export enum LocaleFiles {
    LOG_IN_LOCALE = 'log-in-locale'
}

export interface ILocalService {
    getLocale(select?: string[], language?: string): JSON
}

export default class LocalService implements ILocalService{
    protected lang: string;
    protected default: string;
    protected support: string[];
    protected dir: string;

    constructor(private config: Config, private objectHelper: IObjectHelper) {

        this.config = container.resolve<Config>(`config`)
        this.objectHelper = container.resolve<IObjectHelper>(`objectHelper`)

        this.default = this.config.locale.default
        this.support = this.config.locale.support
        this.dir = this.config.locale.dir
    }

    isSupport(language?: string) {
        return this.support.includes(language)
    }

    readLocaleJSON(language: string): JSON { 
        const dirname = process.cwd() + `/${this.dir}`

        const data = fs.readFileSync(`${dirname}/${language}/${language}-locale.json`, 'utf-8')

        console.log(data)

        return JSON.parse(data)
    }

    parse(data: JSON, select: string[]): JSON {
        const keys = Object.keys(data)

        console.log(`keys: `, keys)

        const filtered = select.filter( key => {
            return keys.includes(key)
        })

        if(filtered.length === 0) {
            return this.objectHelper.clone({})
        }

        return this.objectHelper.pick(data, select)
    }

    public getLocale(select?: string[], language?: string): JSON {
        let locale = this.default

        if (this.isSupport(language)) {
            locale = language
        }

        const data = this.readLocaleJSON(locale)

        return this.parse(data, select)
    }
}