import { permissionsSchema } from './create-permissions-workflow'

export const FindPermissionsWorkflowInputSchema = {
    $id: 'FindPermissionsWorkflowInput',
    type: 'object',
    required: ['encoded', 'action'],
    additionalProperties: false,
    properties: {
        encoded: { type: 'string' },
        action: permissionsSchema
    }
}

