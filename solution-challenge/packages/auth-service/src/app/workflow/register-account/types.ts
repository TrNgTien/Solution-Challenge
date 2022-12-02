export type RegisterAccountWorkflowInput = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export type RegisterAccountWorkflowOutPut = {
    message: string
}