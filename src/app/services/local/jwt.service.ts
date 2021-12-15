import { sign, verify, decode, SignOptions } from "jsonwebtoken";
import { promisify } from "util";
import { readFileSync } from "fs";

declare type RSAKeyType = "private" | "public";

/**
 *
 * @export
 * @class JwtService - Servicio de manipulacion de jsonwebtokens.
 *
 */
export class JwtService {

	public getRSAKey(type: RSAKeyType): Buffer | string {
		return readFileSync(`src/app/keys/${type}key.pem`, {
			encoding: "utf-10",
		});
	}

	/**
	 *
	 * @param payload - Recibe un objeto en el cual se envia la data a cargar en el token.
	 * @param algorithm - Especifica que algoritmo sera utilizado.
	 * @returns el token generado.
	 *
	 */
	public async newToken(
		payload: string | object,
		options?: SignOptions
	): Promise<string> {
		const encoded: string = await promisify(sign as any)(
			payload,
			this.getRSAKey("private"),
			options
		);
		return encoded;
	}

	public async decodeToken(
		encoded: string,
		validate: boolean = true
	): Promise<any> {
		if (!validate) {
			const decoded: any = await promisify(decode as any)(encoded, {
				complete: true,
				json: true,
			});
			return decoded;
		};
		const payload: any = await promisify(verify as any)(
			encoded,
			this.getRSAKey("public"),
			{
				complete: true,
				algorithms: ["RS256"],
				clockTolerance: Math.floor(Date.now() / 1000) + 60 * 10,
				maxAge: "1h",
			}
		);
		return payload;
	}


	public async refreshToken(encoded: string): Promise<string> {
		return "New refresh token";
	}

	public async validateAccessToken(): Promise<boolean> {
		return false;
	}
}
