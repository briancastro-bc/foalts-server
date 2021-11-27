import { getSecretOrPublicKey } from '@foal/jwt';
import { sign, verify, decode, SignOptions } from 'jsonwebtoken';
import { promisify } from 'util';

/**
 * 
 * @export
 * @class JwtService - Servicio de manipulacion de json web tokens.
 * 
 */
export class JwtService {

    /**
     * 
     * @param payload - Recibe un objeto en el cual se envia la data a cargar en el token.
     * @param algorithm - Especifica que algoritmo sera utilizado.
     * @returns el token generado.
     * 
     */
    public async newToken(payload: string|object, options?: SignOptions): Promise<string> {
        const encoded: string = await promisify(sign as any)(
            payload,
            getSecretOrPublicKey(),
            options
        )
        return encoded;
    }

    public async decodeToken(encoded: string, validate: boolean=true): Promise<any> {
        if(!validate) {
            const decoded: any = decode(encoded, {
                complete: true,
                json: true
            });
            return decoded;
        }
        try {
            const payload: any = await promisify(verify as any)(
                encoded,
                getSecretOrPublicKey(),
                {
                    complete: true,
                    algorithms: ['RS256'],
                    clockTolerance: Math.floor(Date.now() / 1000) + 60 * 10,
                    maxAge: '1h'
                }
            );
            return payload;
        } catch(e: any) {
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
