import * as _ from 'lodash'
import { IStringHelper } from "./helpers-interface";
import * as randomString from 'crypto-random-string'

export default class StringHelper implements IStringHelper {
    public upperFirst(str: string): string {
        return _.upperFirst(str)
    }

    public trim(str: string, characters?: string): string {
        return _.trim(str, characters)
    }

    public split(str: string, separator: string | RegExp): string[] {
        return _.split(str, separator)
    }

    public async genRandomString(length: number): Promise<string> {
        return await randomString.async({length: length})
    }
}