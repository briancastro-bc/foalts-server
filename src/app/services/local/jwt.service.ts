import { sign, verify, decode, SignOptions } from "jsonwebtoken";
import { promisify } from "util";
import { readFileSync } from "fs";

/**
 *
 * @export
 * @class JwtService - Servicio de manipulacion de json web tokens.
 *
 */
export class JwtService {
	private readonly publicKey: Buffer | string = readFileSync(
		"src/app/keys/publickey.pem"
	);
	private readonly privateKey: Buffer | string = readFileSync(
		"src/app/keys/privkey.pem"
	);

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
			this.privateKey,
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
		}
		try {
			const payload: any = await promisify(verify as any)(
				encoded,
				this.publicKey,
				{
					complete: true,
					algorithms: ["RS256"],
					clockTolerance: Math.floor(Date.now() / 1000) + 60 * 10,
					maxAge: "1h",
				}
			);
			return payload;
		} catch (e: any) {
			return null;
		}
	}

	public async refreshToken(encoded: string): Promise<string> {
		return "New refresh token";
	}

	public async validateAccessToken(): Promise<boolean> {
		return false;
	}
}
