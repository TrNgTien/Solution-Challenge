import { SCRestResource } from '@rest/sc-rest-resource';
import { useResourceActions } from '@rest/use-resource-action';

type LoginRequest = {
    username: string;
    password: string;
}

type RequestParamsForCreate = any;
export class LoginResource extends SCRestResource {
    readonly id!: string;
    
    pk() {
        return this.id;
    }

    static get key() {
        return 'login-resource';
    }

    static urlRoot = '/api/auth/signin'
}

export const useLoginResourceAction = () => {
    return useResourceActions<RequestParamsForCreate, LoginRequest>(
        LoginResource,
    )
}