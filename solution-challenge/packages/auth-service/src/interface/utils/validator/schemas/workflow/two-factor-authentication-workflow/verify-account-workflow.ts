export const VerifyAccountWorkflowInputSchema = {
    $id: "VerifyAccountWorkflowInput",
    type: 'object',
    required: ["hashcode"],
    additionalProperties: false,
    properties: {
        hashcode: { type: 'string', maxLength: 64, minLength: 64 }
    }
}