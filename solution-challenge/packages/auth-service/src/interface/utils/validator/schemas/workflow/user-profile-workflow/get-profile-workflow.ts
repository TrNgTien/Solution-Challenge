export const GetProfileWorkflowInputSchema = {
    $id: 'GetProfileWorkflowInput',
    type: 'object',
    required: ['users'],
    additionalProperties: false,
    properties: {
        users: {
            type: 'array',
            items: {type: 'integer'}
        }
    }
}