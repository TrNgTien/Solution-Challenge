export const RegisterAccountWorkFlowInputSchema = {
    $id: "RegisterAccountWorkflowInput",
    type: "object",
    required: ['firstName', 'lastName', 'email', 'password'],
    additionalProperties: false,
    properties: {
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        email: { type: 'string', format: 'email' },
        password: { type: 'string' }
    }
}