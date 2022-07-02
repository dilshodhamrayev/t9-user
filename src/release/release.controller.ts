import { Controller, Get, HttpStatus, NotFoundException, Param, Query, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { Release } from './entities/Release';
import { ReleaseService } from './service/release.service';
@ApiTags("Release")
@Controller('release')
export class ReleaseController {

    constructor(private readonly releaseServie: ReleaseService) { }

    @Get('index')
    async findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Release>> {
        return await this.releaseServie.findAll(query)
    }

    @Get("chances/:type/:status")
    async getChances(@Param('type') type, @Param('status') status): Promise<any> {
        return (await this.releaseServie.getChances(type, status)).map(data => data.chance);
    }

    @Get('/update-status')
    async updateStatus(@Res() response, @Query() query) {
        let release = await this.releaseServie.findOne(query.id);

        if (!release) throw new NotFoundException("Release not found");

        release.status = query.status;

        await this.releaseServie.save(release);

        return response.status(HttpStatus.OK).json(release);
    }

    @Get("view/:id")
    async findOne(@Res() response, @Param('id') id) {
        const release = await this.releaseServie.findOne(id);

        if (!release) throw new NotFoundException("Release not found");

        return response.status(HttpStatus.OK).json(release);
    }

    @Get("count")
    async getCounts(@Res() response: Response, @Query() query) {
        return response.status(HttpStatus.OK).json(await this.releaseServie.getCount(query));
    }
}
