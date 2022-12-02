export const ResendHashcodeWorkflowInputSchema = {
    $id: "ResendHashcodeWorkflowInput",
    type: 'object',
    required: ['token'],
    additionalProperties: false,
    properties: {
        token: { type: 'string' }
    }
}