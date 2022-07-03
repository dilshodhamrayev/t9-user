import { BadRequestException, Body, Controller, DefaultValuePipe, Get, HttpStatus, Param, ParseIntPipe, Post, Query, Res } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FilterOperator, Paginate, PaginateQuery, paginate, Paginated } from 'nestjs-paginate'
// import { Pagination } from "nestjs-typeorm-paginate";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/User";
import { UserService } from './services/user.service';

@ApiTags('User')
@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService) { }
    
    
}