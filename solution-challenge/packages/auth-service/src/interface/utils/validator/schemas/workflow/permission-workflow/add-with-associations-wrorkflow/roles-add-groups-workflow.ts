export const RolesAddGroupsWorkflowInputSchema = {
    $id: 'RolesAddGroupsWorkflowInput',
    type: 'object',
    additionalProperties: false,
    required: ['roles', 'groups'],
    properties: {
        roles: {
            type: 'array',
            items: { type: 'number' }
        },
        groups: {
            type: 'array',
            items: { type: 'number' }
        }
    }
}