import {
	ApiInfo,
	ApiServer,
	Context,
	Get,
	HttpResponseOK,
	IAppController,
	controller,
} from "@foal/core";
import { InvalidTokenError, JWTOptional } from "@foal/jwt";
import { fetchUserWithPermissions } from "@foal/typeorm";
import { readFileSync } from "fs";

import { User } from "@app/entities";

import { AuthController } from "./api";

@ApiInfo({
	title: 'RESTful API Portofolio',
	description: 'An API RESTful for Bye Code server portofolio',
	version: '1.0.0'
})
@ApiServer({
	url: '/api'
})
@JWTOptional(
	{
		csrf: false,
		user: fetchUserWithPermissions(User),
		secretOrPublicKey: async (header, payload) => {
			if (header.alg !== "RS256") {
				throw new InvalidTokenError("Invalid algorithm");
			}
			const publicKey: Buffer = readFileSync(
				"src/app/keys/publickey.pem"
			);
			return publicKey.toString();
		},
	},
	{
		algorithms: ["RS256"],
		complete: true,
	}
)
export class ApiController implements IAppController {

	subControllers = [controller("/auth", AuthController)];

	@Get("/")
	index(ctx: Context) {
		return new HttpResponseOK("Hello world!");
	}
}
