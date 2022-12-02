import { Permission } from "../../../interface/low-level/permission/permission-entity"

export type CreateRolesWorkflowInput = {
    roles: string[],
    group?: string[]
}

export type CreateRolesWorkflowOutput = {
    message: string
}

export type CreateGroupsWorkflowInput = {
    groups: [] 
}

export type CreateGroupsWorkflowOutput = {
    message: string
}

export type CreatePermissionsWorkflowInput = {
    permissions: {
        type: string,
        action: string,
        key: string,
        signal?: string
    }[]
    groups?: number[]
}

export type CreatePermissionsWorkflowOutput = {
    message: string
}



export type CheckPermissionsWorkflowInput = {
    encoded: string,
    action: {
        type: string,
        action: string,
        key: string,
    }
}

export type CheckPermissionsWorkflowOutput = {
    access: boolean
}

export type FindAllPermissionsWorkflowInput = {
    encoded: string
}

export type FindAllPermissionsWorkflowOutput = {
    permissions: Permission[]
}