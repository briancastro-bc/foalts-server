import {
	dependency,
	HttpResponseBadRequest,
	HttpResponseCreated,
	HttpResponseOK,
	HttpResponseUnauthorized,
	verifyPassword,
} from "@foal/core";
import { isCommon } from "@foal/password";

import { JwtService } from "@app/services";
import { User } from "@app/entities";
import { LoginDTO, SignupDTO } from "@app/dto";

/**
 *
 * @export
 * @class AuthService - Representa el servicio de autenticación.
 *
 */
export class AuthService {

	@dependency
	jwt: JwtService //TODO: ERROR

	async login(loginDTO: LoginDTO): Promise<HttpResponseOK|HttpResponseUnauthorized> {
		const user = await User.findOne({
			email: loginDTO.email,
		});
		if (!user)
			return new HttpResponseUnauthorized({
				message: "Wrong credentials",
			});
		if (!(await verifyPassword(loginDTO.password, user.password)))
			return new HttpResponseUnauthorized({
				message: "Wrong credentials",
			});
		const token: string = await this.jwt.newToken(
			{
				iss: "bye-code.com",
				sub: user.id,
				iat: Math.floor(Date.now() / 1000) - 30,
			},
			{
				algorithm: "RS256",
				expiresIn: "15m",
			}
		);
		return new HttpResponseOK({
			token: token,
		});
	}

	async signup(signupDTO: SignupDTO): Promise<HttpResponseCreated|HttpResponseBadRequest> {
		let user = await User.findOne({
			email: signupDTO.email,
		});
		if (user)
			return new HttpResponseBadRequest({
				message: "This email is already registered",
			});
		try {
			user = new User();
			user.email = signupDTO.email;
			await user.setPassword(signupDTO.password);
			user.name = signupDTO.name;
			user.lastName = signupDTO.lastName;
			await user.save();
			return new HttpResponseCreated({
				message: "user registered"
			});
		} catch (e: unknown) {
			return new HttpResponseBadRequest({ 
				message: `Error: ${e}` 
			});
		}
	}

	async sendAccountValidation(): Promise<void> {}

	async verifyAccount(): Promise<void> {}

	async recoveryPassword(): Promise<void> {}

	createNewPassword(lenght: number = 8): string {
		const HEX_CHARACTERS: string = "1234567890abcdefABCDEF";
		let generated_password: string = "";
		for (let i = 0; i < lenght; i++) {
			generated_password += HEX_CHARACTERS.charAt(
				Math.floor(Math.random() * HEX_CHARACTERS.length)
			);
		}
		return generated_password;
	}
}
