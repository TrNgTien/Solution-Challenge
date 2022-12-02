export const ChangingPasswordWorkflowInputSchema = {
    $id: 'ChangingPasswordWorkflowInput',
    type: 'object',
    required: ['hashcode', 'password'],
    additionalProperties: false,
    properties: {
        hashcode: { type: 'string', maxLength: 64, minLength: 64 },
        password: { type: 'string' }
    },
}