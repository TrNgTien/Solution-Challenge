export type RolesAddGroupsWorkflowInput = {
    roles: number[],
    groups: number[]
}

export type RolesAddGroupsWorkflowOutput = {
    message: string
}

export type UsersAddRolesWorkflowInput = {
    users: number[],
    roles: number[]
}

export type UsersAddRolesWorkflowOutput = {
    message: string
}

export type PermissionsAddGroupsWorkflowInput = {
    permissions: number[],
    groups: number[]
}

export type PermissionsAddGroupsWorkflowOutput = {
    message: string
}