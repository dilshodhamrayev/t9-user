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
    
    @ApiOperation({summary: 'Создать пользователя'})
    @ApiResponse({status: 200, type:User})
    @Post()
    async createUser(@Res() response, @Body() user: CreateUserDto) {
        // const {username, ...rest} = user;
        // const existingUser = await this.userService.getUsername(username);
        // if (existingUser) {
        //     throw new BadRequestException('Пользователь уже есть.');
        // }
        const newUser = await this.userService.createUser(user);
        return response.status(HttpStatus.CREATED).json({ newUser });
    }
    

    // @Get()
    // async findAll(
    //     @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    //     @Query('limit', new DefaultValuePipe(2), ParseIntPipe) limit: number = 2
    //     ):Promise<Pagination<User>>  {
    //         limit = limit > 100 ? 100 : limit;
    //         return await this.userService.findAll({
    //             page,
    //             limit,
    //             route: 'http://localhost:3100/user',
    //           });
    // }
    @Get('index')
    async index(@Paginate() query: PaginateQuery): Promise<Paginated<User>> {
        return this.userService.index(query)
    }
    @Get('winners')
    async userWinners(@Paginate() query: PaginateQuery): Promise<Paginated<User>> {
        return this.userService.winners(query)
    }

    @Get('winners/:id')
    async userWinnersByCompany(@Paginate() query: PaginateQuery, @Param('id') id): Promise<Paginated<User>> {
        return this.userService.winnersByCompany(query, id)
    }

    @Get('winners-brand/:company_id/:brand_id')
    async userWinnersByBrand(@Paginate() query: PaginateQuery, @Param('company_id') company_id, @Param('brand_id') brand_id): Promise<Paginated<User>> {
        return this.userService.winnersByBrand(query, company_id, brand_id)
    }

    @Get("/:id")
    async findOne(@Res() response, @Param('id') id) {
        const user = await this.userService.findOne(id);
        return response.status(HttpStatus.OK).json({
            user
        });
    }
}