export const UpdateProfileWorkflowInputSchema = {
    $id: 'UpdateProfileWorkflowInput',
    type: 'object',
    required: ['userId'],
    additionalProperties: true,
    properties: {
        userId: {type: 'integer'},
        firstName: {type: 'string'},
        lastName: {type: 'string'},
        gender: {type: 'string'},
        birthday: {type: 'string'},
        phone: {type: 'string'},
        address: {type: 'string'},
        job: {type: 'string'},
        company: {type: 'string'},
        academicLevel: {type: 'string'},
        bachelor: {type: 'string'},
    }
}