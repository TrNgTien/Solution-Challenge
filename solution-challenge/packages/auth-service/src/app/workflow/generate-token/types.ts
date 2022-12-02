//standard input and output for workflow

export type GenerateTokenWorkflowInput = {
    email: string,
    password: string,
}

export type GenerateTokenWorkFlowOutPut = {
    token: string,
    verified: boolean
}