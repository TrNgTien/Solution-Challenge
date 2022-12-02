import * as _ from 'lodash'
import { IObjectHelper } from './helpers-interface';

export default class ObjectHelper implements IObjectHelper {
    public omitByUndefined(object: any): any {
        return _.omitBy(object, _.isUndefined)
    }

    public pick(object: any, ...props: any[]): any {
        return _.pick(object, ...props)
    }

    public cloneDeep(value: any): any {
        return _.cloneDeep(value)
    }

    public isEqual(object: any, other: any): boolean {
        return _.isEqual(object, other)
    }

    public assignIn(object: any, other: any): {} {
        return _.assignIn(object, other)
    }

    public clone(object: {}): {} {
        return _.clone(object)
    }

    public extend(obj: {}, src: {}): {} {
        return _.extend(obj, src);
    }
    
    public set(object: {}, path: _.Many<string | number | symbol>, value: any): {} {
        return _.set(object, path, value)
    }

    public values<T extends object>(object: T | null | undefined): Array<T[keyof T]> {
        return _.values(object)
    }
}