import { Body, Controller, Get, HttpStatus, Param, Post, Res, UseGuards, UploadedFile, UseInterceptors, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { Settings } from './entities/Settings';
import { SettingsService } from './service/settings.service';
@ApiTags("Settings")
@Controller('settings')
export class SettingsController {
    constructor(private readonly settingsService: SettingsService) { }

    @Get('index')
    async findAll(){
        return await this.settingsService.findCurrent();
    }
}
