import {
    Context,
    dependency,
    HttpResponseBadRequest,
    HttpResponseOK,
    HttpResponseUnauthorized,
    verifyPassword,
} from '@foal/core';
import { isCommon } from '@foal/password';

import { JwtService } from '..';
import { User, Profile } from '../../entities';

/**
 * 
 * @export
 * @class AuthService - Representa el servicio de autenticación.
 * 
 */
export class AuthService {

    public async login(email: string, password: string): Promise<any> {
        const user = await User.findOne({
            email: email
        });
        if(!user) return null;
        if(!await verifyPassword(password, user.password!)) return null;
        return user;
    }

    public async signup(email: string, password: string, name: string, lastName: string, phonePrefixCode: string, cellphoneNumber: string): Promise<any> {
        //if(await isCommon(password)) return null;
        let user = await User.findOne({
            email: email
        });
        if(user) return null;
        try {
            let profile: Profile = new Profile();
            user = new User();
            user.email = email;
            await user.setPassword(password);
            user.name = name;
            user.lastName = lastName;
            profile.phonePrefixCode = phonePrefixCode;
            profile.cellphoneNumber = cellphoneNumber;
            profile.user = user;
            user.profile = profile;
            
            await profile.save();
            await user.save();

            return user;
        } catch(e: unknown) {
            throw e;
        }
    }

    public async sendAccountValidation(): Promise<void> {

    }

    public async verifyAccount(): Promise<void> {

    }

    public async recoveryPassword(): Promise<void> {

    }

    public createNewPassword(lenght: number=8): string {
        const HEX_CHARACTERS: string = "1234567890abcdefABCDEF";
        let generated_password: string = "";
        for(let i = 0; i < lenght; i++) {
            generated_password += HEX_CHARACTERS.charAt(Math.floor(Math.random() * HEX_CHARACTERS.length));
        }
        return generated_password;
    }

}