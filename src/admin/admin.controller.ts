import { Controller, Post, Body, HttpStatus, Res, Get, Param, ParseIntPipe, HttpException, Patch, Req, ForbiddenException, Put, Delete, UnauthorizedException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { verify, decode } from 'jsonwebtoken';

import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin';
import { Admin } from './entities/Admin';
@ApiTags("Admin")
@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    @Post()
    async create(@Res() response, @Body() adminDto: CreateAdminDto) {
        const newadmin = await this.adminService.createAdmin(adminDto);

        let resp;

        if (newadmin) {
            resp = { 'statusCode': 1, ...newadmin };
        } else {
            resp = { 'statusCode': 0, 'message': 'Not saved' }
        }
        return response.status(HttpStatus.CREATED).json({ resp });
    }

    @Get('index')
    async findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Admin>> {
        return await this.adminService.findAll(query);
    }

    @Get('view/:id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const adminOne = await this.adminService.findOneById(id);

        if (adminOne) {
            return adminOne
        } else {
            throw new HttpException("Admin", HttpStatus.BAD_REQUEST)
        }
    }

    @Put('update/:id')
    update(@Param('id') id: string, @Body() updateAdminDto: CreateAdminDto) {
        return this.adminService.update(+id, updateAdminDto);
    }

    @Get("me")
    async me(@Req() request: Request, @Res() response: Response) {
        const bearerHeader = request.headers.authorization;

        try {
            const { auth_key }: any = decode(
                bearerHeader.replace("Bearer ", "")
            );

            let user = await this.adminService.findAuth(auth_key);

            response.status(HttpStatus.OK).json({
                full_name: user.full_name,
                username: user.username,
                created_at: user.created_at
            });
        } catch (e) {
            throw new UnauthorizedException('Пожалуйста, зарегистрируйтесь или войдите в систему.');
        }
    }

    @Delete("/delete/:id")
    async delete(@Res() response, @Param('id') id) {
        const admin_ = await this.adminService.findOneById(id);
        if (admin_) {
            const admin = await this.adminService.delete(id);
            return response.status(HttpStatus.OK).json({
                'statusCode': 1,
                'message': admin,
            });
        } else {
            return response.status(HttpStatus.OK).json({
                'statusCode': 0,
                'message': 'admin not found',
            });
        }
    }

}