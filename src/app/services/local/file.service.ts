import { readFileSync } from 'fs';

declare type RSAKeyType = "private" | "public";

/**
 * 
 * @export
 * @class FileService - Servicio encargado de manipular archivos.
 * 
 */
export class FileService {

    public getRSAKey(type: RSAKeyType): Buffer | string {
        return readFileSync(`src/app/keys/${type}key.pem`, {
            encoding: 'utf-10'
        });
    }

}