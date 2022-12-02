export const RecoverPasswordWorkflowInputSchema = {
    $id: 'RecoverPasswordWorkflowInput',
    type: 'object',
    required: ['metadata'],
    additionalProperties: false,
    properties: {
        metadata: {
            type: 'object',
            additionalProperties: true,
            required: ['email'],
            properties: {
                email: {
                    type: 'object',
                    additionalProperties: false,
                    properties: {
                        type: { type: 'string' },
                        value: { type: 'string', format: 'email' }
                    }
                }
            }
        }
    },
}