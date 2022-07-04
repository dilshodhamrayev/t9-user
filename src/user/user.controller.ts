import { BadRequestException, Body, Controller, DefaultValuePipe, Get, HttpStatus, Param, ParseIntPipe, Post, Query, Res, Req, UnauthorizedException } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Request, Response } from "express";
import { FilterOperator, Paginate, PaginateQuery, paginate, Paginated } from 'nestjs-paginate'
// import { Pagination } from "nestjs-typeorm-paginate";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/User";
import { UserService } from './services/user.service';
import { verify, decode } from 'jsonwebtoken';

@ApiTags('User')
@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService) { }
    
    @Get("me")
    async me(@Req() request: Request, @Res() response: Response) {
        const bearerHeader = request.headers.authorization;

        try {
            const { auth_key }: any = decode(
                bearerHeader.replace("Bearer ", "")
            );

            let company = await this.userService.findAuth(auth_key);

            response.status(HttpStatus.OK).json({
                full_name: company.fname + " " + company.lname,
                username: company.username,
                created_at: company.created_at
            });
        } catch (e) {
            throw new UnauthorizedException('Пожалуйста, зарегистрируйтесь или войдите в систему.');
        }
    }
    
}