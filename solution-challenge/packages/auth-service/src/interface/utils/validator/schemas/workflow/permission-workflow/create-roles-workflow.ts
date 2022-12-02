export const CreateRolesWorkflowInputSchema = {
    $id: 'CreateRolesWorkflowInput',
    type: 'object',
    required: ['roles'],
    additionalProperties: false,
    properties: {
        roles: {
            type: 'array',
            items: {type: 'string' }
        },
        group: {
            type: 'array',
            items: { type: 'string' }
        }
    }
}