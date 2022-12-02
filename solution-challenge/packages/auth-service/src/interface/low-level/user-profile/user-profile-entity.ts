import { EntityBase } from "../entity-base";
import { User } from "../user/user-entity";

export interface IUserProfileAttributes {
    id?: number,
    userId: number,
    firstName?: string,
    lastName?: string,
    gender?: string,
    birthday?: Date,
    phone?: string,
    // accountType?: string,
    address?: string,
    job?: string,
    company?: string,
    academicLevel?: string,
    bachelor?: string
}

export const PhoneFormat =  '/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/'

export class UserProfile extends EntityBase implements IUserProfileAttributes {
    public readonly id: number;
    public readonly userId: number;
    public readonly firstName: string;
    public readonly lastName: string;
    public readonly gender: string;
    public readonly birthday: Date;
    public readonly phone: string;
    // public readonly accountType?: string;
    public readonly address: string;
    public readonly job: string;
    public readonly company: string;
    public readonly academicLevel: string;
    public readonly bachelor: string;

    constructor(
        {
            id,
            userId,
            firstName,
            lastName,
            gender,
            phone,
            address,
            // accountType,
            job,
            company,
            academicLevel,
            bachelor
        }: IUserProfileAttributes
    ) {
        super()

        if(phone) {
            this.checkPhone(phone)
        }

        this.id = id,
        this.userId = userId,
        this.firstName = firstName,
        this.lastName = lastName,
        this.gender = gender,
        this.phone = phone,
        this.address = address,
        this.job = job,
        // this.accountType = accountType,
        this.company = company,
        this.academicLevel = academicLevel,
        this.bachelor = bachelor
    }

    private checkPhone(phone: string): Boolean {
        if(!phone.match(PhoneFormat)) {
            throw new Error(`Phone is not matched the Format.`)
        }
        return true
    }

    public async validate(): Promise<boolean> {
        ['id', 'user', 'firstName', 'lastName', 'gender', 'phone'].forEach( key => {
            if(!this[key]) {
                throw new Error(`object missing field ${key}`)
            }
        })
        return true
    }
}