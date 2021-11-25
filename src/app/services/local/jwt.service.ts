export class JwtService {

    constructor() {}

    public async newToken(): Promise<string> {
        return "A token";
    }

    public async decodeToken(): Promise<object> {
        return {};
    }

    public async refreshToken(): Promise<string> {
        return "New refresh token";
    }

    public async validateAccessToken(): Promise<boolean> {
        return false;
    }

}
