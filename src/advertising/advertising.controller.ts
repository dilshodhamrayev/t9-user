import { Body, Controller, Get, HttpStatus, Param, Post, Res, UseGuards, UploadedFile, UseInterceptors, Delete, ParseIntPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { storage } from 'utils/storage';
import { Product } from '../product/entities/Product';
import { AdvertisingDto } from './dto/advertising.dto';
import { Advertising } from './entities/Advertising';
import { AdvertisingService } from './service/advertising.service';
@ApiTags("Advertising")
@Controller('advertising')
export class AdvertisingController {
    constructor(private readonly advertisingService: AdvertisingService) { }
}
