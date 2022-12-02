import * as _ from 'lodash'

export interface IStringHelper {
    upperFirst(str: string): string
    trim(str: string, characters?: string): string
    split(str: string, separator: string | RegExp): string[] 
    genRandomString(length: number): Promise<string>
}

export interface IJWTHelper {
    signIn(payload: { [key: string]: any }): string;
    verify(token: string): { [key: string]: any } ;
}

export interface IPasswordHelper {
    encrypt(password: string): string;
    compare(passwrod: string, encoded: string): boolean;
}

export interface IBase64Helper {
    encode(input: any): string
    decode(input: string): string
}

export interface IArrayHelper {
    isEmpty(value: any): boolean;
    unique<T>(array: ArrayLike<T>, field: string): T[];
    difference(array: ArrayLike<{}>, ...value: ArrayLike<{}>[]): {[key: string]: string}[];
    flattenDeep(array: _.ListOfRecursiveArraysOrValues<{}>): {}[];
    compact(array: ArrayLike<any>): any[];
    chunk(array: ArrayLike<never>, iteratees: any): never[][];
    slice(array: ArrayLike<{}>, iteratees: any): {}[];
    sortBy(array: ArrayLike<{}>, iteratees: any): {}[];
    orderBy(array: ArrayLike<{}>, iteratees: any, orders: any): {}[];
}

export interface IObjectHelper {
    omitByUndefined(object: any): any;
    pick(object: any, ...props: any[]): any;
    cloneDeep(object: any): any;
    isEqual(object: any, other: any): boolean;
    assignIn(object: any, src: {}): {};
    clone(object: any): any;
    set(object: any, path: _.Many<string | number | symbol>, value: any): {}
    values<T extends object>(object: T | null | undefined): Array<T[keyof T]>
    extend(obj: {}, src: {}): {};
}

