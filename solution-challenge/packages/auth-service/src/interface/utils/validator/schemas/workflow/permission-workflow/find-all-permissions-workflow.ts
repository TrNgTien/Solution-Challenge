export const FindAllPermissionsWorkflowInput = {
    $id: `FindAllPermissionsWorkflowInput`,
    type: 'object',
    required: ['encoded'],
    additionalProperties: false,
    properties: {
        encoded: { type: 'string' }
    }
}