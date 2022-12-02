export const GenerateTokenWorkflowInputSchema = {
    $id: 'GenerateTokenWorkflowInput',
    type: 'object',
    required: ['email','password'],
    additionalProperties: false,
    properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string' }
    },
}