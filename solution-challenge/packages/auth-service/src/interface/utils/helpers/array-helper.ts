import * as _ from 'lodash'
import { IArrayHelper } from './helpers-interface';

//difine handle function for Array.
export default class ArrayHelper implements IArrayHelper {
    public isEmpty(value: any): boolean {
        return _.isEmpty(value)
    }

    // find uniq element.
    public unique<T>(array: ArrayLike<T>, field: string): T[] {
        return _.uniqBy<T>(array, field)
    }

    //find difference between arrays.
    public difference(array: ArrayLike<{}>,...values: ArrayLike<{}>[]): {}[] {
        return _.difference(array, ...values)
    }

    // flat to lowest Depth of Array.
    public flattenDeep( array: _.ListOfRecursiveArraysOrValues<{}>): {}[] {
        return _.flattenDeep(array)
    }

    //filter undefined value in Array.
    public compact(array: ArrayLike<any>): any[] {
        return _.compact(array)
    }

    //split to pieces from original Array.
    public chunk(array: ArrayLike<never>, size?: number): never[][] {
        return _.chunk(array, size)
    }

    //slice Array
    public slice(array: ArrayLike<{}>, start?: number, end?: number): {}[] {
        return _.slice(array, start, end)
    }

    //Sort in Ascending.
    public sortBy(array: ArrayLike<{}>, iteratees: any): {}[] {
        return _.sortBy(array, iteratees)
    }

    //Sort with propname and condition.
    public orderBy(array: ArrayLike<{}>, iteratees: any, orders: any): {}[] {
        return _.orderBy(array, iteratees, orders)
    }
}