import {
	Context,
	Get,
	Post,
	HttpResponseOK,
	HttpResponseUnauthorized,
	HttpResponseBadRequest,
	ValidateBody,
	dependency,
	HttpResponseCreated,
} from "@foal/core";

import { AuthService, JwtService } from "@app/services/index";
import { userLoginSchema, userSignupSchema } from "@app/schemas/index";
import { User } from "@app/entities/index";

export class AuthController {
	@dependency
	authService: AuthService;

	@dependency
	jwtService: JwtService;

	@Get("/login")
	viewLogin(ctx: Context) {
		return new HttpResponseOK("Hello world");
	}

	@Post("/login")
	@ValidateBody(userLoginSchema, {
		openapi: true,
	})
	async login(
		ctx: Context<User>
	): Promise<HttpResponseOK | HttpResponseUnauthorized> {
		const user: User = await this.authService.login(
			ctx.request.body.email,
			ctx.request.body.password
		);
		if (!user)
			return new HttpResponseUnauthorized({
				message: "Wrong credentials",
			});
		const accessToken: string = await this.jwtService.newToken(
			{
				iss: "https://j-shop.com",
				sub: user.id,
				iat: Math.floor(Date.now() / 1000) - 30,
			},
			{
				algorithm: "RS256",
				expiresIn: "15m",
			}
		);
		return new HttpResponseOK({ accessToken });
	}

	@Post("/signup")
	@ValidateBody(userSignupSchema, {
		openapi: true,
	})
	async signup(
		ctx: Context<User>
	): Promise<HttpResponseCreated | HttpResponseBadRequest> {
		console.log(ctx.request.body.email);
		const newUser: User = await this.authService.signup(
			ctx.request.body.email,
			ctx.request.body.password,
			ctx.request.body.name,
			ctx.request.body.lastName,
			ctx.request.body.phonePrefixCode,
			ctx.request.body.cellphoneNumber
		);
		if (!newUser)
			return new HttpResponseBadRequest({
				message: "E-mail exists or password is too common",
			});
		const accessToken: string = await this.jwtService.newToken(
			{
				iss: "https://j-shop.com",
				sub: newUser.id,
				iat: Math.floor(Date.now() / 1000) - 30,
			},
			{
				algorithm: "RS256",
				expiresIn: "15m",
			}
		);
		return new HttpResponseCreated({ accessToken });
	}

	@Post("/google")
	async google(ctx: Context) {
		return new HttpResponseOK();
	}

	@Post("/google/callback")
	async googleCallback(ctx: Context) {
		return new HttpResponseOK();
	}

	@Post("/facebook")
	async facebook(ctx: Context) {
		return new HttpResponseOK();
	}

	@Post("/facebook/callback")
	async facebookCallback(ctx: Context) {
		return new HttpResponseOK();
	}

	@Post("/verifyAccount")
	async verifyAccount(ctx: Context) {
		return new HttpResponseOK();
	}

	@Post("/passwordRecovery")
	async passwordRecovery(ctx: Context) {
		return new HttpResponseOK();
	}
}
