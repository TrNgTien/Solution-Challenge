import jwt from 'jsonwebtoken' 
import { IJWTHelper } from './helpers-interface';

//difine function for JWT.
export default class JwtHelper implements IJWTHelper {
    private readonly SECRET = "somethingwrong123";
    private options: jwt.SignOptions = { algorithm: 'HS256'}

    public signIn(payload: {[key: string]: string}): string {
        const options: jwt.SignOptions = { algorithm: 'HS256', expiresIn: '6h' }
        
        return jwt.sign(payload, this.SECRET, options)
    }

    public verify(token: string): any {
        return jwt.verify(token, this.SECRET, this.options)
    }
}