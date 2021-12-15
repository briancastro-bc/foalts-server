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

import { AuthService } from "@app/services/index";
import { userLoginSchema, userSignupSchema } from "@app/schemas/index";
import { User } from "@app/entities/index";

export class AuthController {

	@dependency
	auth: AuthService;

	@Get("/login")
	viewLogin(ctx: Context) {
		return new HttpResponseOK("Hello world");
	}

	@Post("/login")
	@ValidateBody(userLoginSchema, {
		openapi: true,
	})
	async login(ctx: Context<User>): Promise<HttpResponseOK|HttpResponseUnauthorized> {
		return this.auth.login(ctx.request.body);
	}

	@Post("/signup")
	@ValidateBody(userSignupSchema, {
		openapi: true,
	})
	async signup(ctx: Context<User>): Promise<HttpResponseCreated|HttpResponseBadRequest> {
		return await this.auth.signup(ctx.request.body);
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
