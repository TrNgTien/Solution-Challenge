export type RecoverPasswordWorkflowInput = {
    metadata: {
        email: {
            type: string,
            value: string
        }
    }
}

export type RecoverPasswordWorkflowOutput = {
    message: string
}

export type ChangingPasswordWorkflowInput = {
    hashcode: string,
    password: string
}

export type ChangingPasswordWorkflowOutput = {
    message: string
}