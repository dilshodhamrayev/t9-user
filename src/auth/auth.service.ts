import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { UserService } from '../user/services/user.service';
import { AccessTokenPayload, RefreshTokenPayload } from './type/jwtPayload';

@Injectable()
export class AuthService {
    constructor(private readonly adminService: UserService) { }

    createAccessToken({ auth_key }: AccessTokenPayload): string {
        return sign({ auth_key }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '120m',
        });
    }

    createRefreshToken({ adminId, tokenVersion }: RefreshTokenPayload): string {
        return sign({ adminId, tokenVersion }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '7d',
        });
    }

    assignTokens(auth_key: string) {
        return {
            accessToken: this.createAccessToken({ auth_key }),
            // refreshToken: this.createRefreshToken({ adminId, tokenVersion }),
        };
    }
}
