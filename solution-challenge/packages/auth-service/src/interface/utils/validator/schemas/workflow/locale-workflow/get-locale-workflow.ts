export const GetLocaleWorkflowInputSchema = {
    $id: 'GetLocaleWorkflowInput',
    type: 'object',
    required: ['language', 'select'],
    additionalProperties: false,
    properties: {
        language: { type: 'string', maxLength: 2, minLength: 2 },
        select: { 
            type: 'array',
            items: {type: 'string'} 
        }
    },
}