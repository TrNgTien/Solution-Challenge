import bcrypt from 'bcrypt'
import { IPasswordHelper } from './helpers-interface';


//difine function for Password
export default class PasswordHelper implements IPasswordHelper {
    public encrypt(password: string): string {
        if (!password) {
            throw Error(`missing password`)
        }
        const salt = bcrypt.genSaltSync()

        return bcrypt.hashSync(password, salt)
    }

    public compare(password: string, encoded: string): boolean {
        if (!password) {
            throw Error(`missing password`)
        }
        if (!encoded) {
            throw Error(`missing encoded password`)
        }

        return bcrypt.compareSync(password, encoded)
    }
}