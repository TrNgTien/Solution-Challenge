export const UsersAddRolesWorkflowInputSchema = {
    $id: 'UsersAddRolesWorkflowInput',
    type: 'object',
    additionalProperties: false,
    required: ['users', 'roles'],
    properties: {
        users: { 
            type: 'array', 
            items: { type: 'integer' }  
        },
        roles: {
            type: 'array',
            items: { type: 'integer' }
        }
    }
}