import { UserProfile } from "../../../interface/low-level/user-profile/user-profile-entity"
import { User } from "../../../interface/low-level/user/user-entity"

export type UpdateProfileWorkflowInput = {
    userId: number,
    firstName?: string,
    lastName?: string,
    gender?: string,
    birthday?: Date,
    phone?: string,
    address?: string,
    job?: string,
    company?: string,
    academicLevel?: string,
    bachelor?: string

}

export type UpdateProfileWorkflowOutput = {
    message: string
}

export type GetProfileWorkflowInput = {
    users: number[],
}

export type GetProfileWorkflowOutput = {
    profiles: UserProfile[]
}