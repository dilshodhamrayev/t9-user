import {
    Controller,
    Post,
    Body,
    BadRequestException,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginResponse } from './type/loginResponse';
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from './dto/loginUser.dto';
import { AdminService } from '../admin/admin.service';
import { CreateAdminDto } from '../admin/dto/create-admin';
import * as crypto from 'crypto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags("Auth for Admin")
@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly adminService: AdminService,
    ) { }

    @Post('register')
    async register(@Body() adminDto: CreateAdminDto): Promise<LoginResponse> {
        const { username, password_hash } = adminDto;

        const existingUser = await this.adminService.getUsername(username);

        if (existingUser) {
            throw new BadRequestException('Пользователь уже есть.');
        }

        try {
            const saltRounds = 12;

            const hashedPassword = await bcrypt.hash(password_hash, saltRounds);

            const auth_key = crypto.randomBytes(64).toString('hex');

            const user = await this.adminService.createAdmin({ ...adminDto, password_hash: hashedPassword, auth_key: auth_key });

            const tokens = this.authService.assignTokens(user.auth_key);

            return tokens;
        } catch (error) {
            throw new BadRequestException('Не удалось зарегистрировать пользователя.');
        }
    }

    @Post('login')
    async loginUser(@Body() loginUserDto: LoginUserDto): Promise<LoginResponse> {
        const { username, password_hash: loginPassword } = loginUserDto;
        let existingUser;
        let isValid: boolean;

        try {
            existingUser = await this.adminService.findUserWithPassword(username);
            isValid = await bcrypt.compare(loginPassword, existingUser.password_hash);
        } catch (error) {
            throw new UnauthorizedException('Имя пользователя или пароль недействительны');
        }

        if (!isValid) {
            throw new UnauthorizedException('Имя пользователя или пароль недействительны');
        }

        const { auth_key } = existingUser;

        const tokens = this.authService.assignTokens(auth_key);

        return tokens;
    }
}
