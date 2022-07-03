import { verify } from 'jsonwebtoken';
import { NestMiddleware, Injectable, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from '../../user/services/user.service';

/** The AuthMiddleware is used to
 * (1) read the request header bearer token/user access token
 * (2) decrypt the access token to get the user object
 */
@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly adminService: UserService) { }

    async use(req: Request | any, res: Response, next: () => void) {
        const bearerHeader = req.headers.authorization;

        let user;

        try {
            const { adminId: auth_key }: any = verify(
                bearerHeader.replace("Bearer ", ""),
                process.env.ACCESS_TOKEN_SECRET,
            );
            user = await this.adminService.findAuth(auth_key);
        } catch (error) {
            throw new UnauthorizedException('Пожалуйста, зарегистрируйтесь или войдите в систему.');
        }

        if (user) {
            req.user = user;
        }
        
        next();
    }
}
