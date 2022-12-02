export const CreateGroupsWorkflowInputSchema = {
    $id: 'CreateGroupsWorkflowInput',
    type: 'object',
    additionalProperties: false,
    required: ['groups'],
    properties: {
        groups: { 
            type: 'array',
            items: { type: 'string' }
        }
    }
}