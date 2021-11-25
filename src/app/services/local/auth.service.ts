export class AuthService {

    constructor() {}

    public async login(user: any): Promise<string> {
        return "Login method is works";
    }

    public async signup(): Promise<string> {
        return "Signup methods is works";
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