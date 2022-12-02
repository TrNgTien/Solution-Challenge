export const PermissionsAddGroupsWorkflowInputSchema = {
    $id: 'PermissionsAddGroupsWorkflowInput',
    type: 'object',
    additionalProperties: false,
    required: ['permissions', 'groups'],
    properties: {
        permissions: {
            type: 'array',
            items: { type: 'number' }
        },
        groups: {
            type: 'array',
            items: { type: 'number' }
        }
    }
}