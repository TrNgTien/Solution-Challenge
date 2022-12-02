export const permissionsSchema = {
    type: 'object',
    required: ['type', 'action', 'key'],
    properties: {
        type: { type: 'string' },
        action: { type: 'string' },
        key: { type: 'string' }
    }
}

export const CreatePermissionsWorkflowInputSchema = {
    $id: 'CreatePermissionsWorkflowInput',
    type: 'object',
    required: ['permissions'],
    additionalProperties: false,
    properties: {
        groups: {
            type: 'array',
            items: { type: 'number' } 
        },
        permissions: {
            type: 'array',
            items: permissionsSchema
        }
    }
}