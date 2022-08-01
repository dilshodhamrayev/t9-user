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

    // @UseInterceptors(FileInterceptor('file', storage('./uploads/category/')))
    // @Post('create')
    // async createCategory(@Res() response, @Body() category: AdvertisingDto, @UploadedFile() file) {
    //     const data = file ? { ...category, image: '/uploads/category/' + file.filename } : category;
    //     const newCategory = await this.advertisingService.createCategory(data);
    //     let resp;
    //     if (newCategory) {
    //         resp = { 'statusCode': 1, ...newCategory };
    //     } else {
    //         resp = { 'statusCode': 0, 'message': 'Not saved' }
    //     }
    //     return response.status(HttpStatus.CREATED).json(resp);
    // }

    // @UseInterceptors(FileInterceptor('file', storage('./uploads/category/')))
    // @Post('/update/:id')
    // async updateCategory(@Res() response, @Body() updatedCategoryDto: CategoryDto, @Param('id') id, @UploadedFile() file) {
    //     let resp;

    //     const category = await this.advertisingService.findOne(id);

    //     if (category) {
    //         const data = file ? { ...updatedCategoryDto, image: '/uploads/category/' + file.filename } : updatedCategoryDto;
    //         const updatedCategory = await this.advertisingService.updateCategory(data, id);

    //         if (updatedCategory) {
    //             resp = { 'statusCode': 1, ...updatedCategory };
    //         } else {
    //             resp = { 'statusCode': 0, 'message': 'not updated' };
    //         }
    //     }
    //     else {
    //         resp = { 'statusCode': 0, 'message': 'category not found' };
    //     }
    //     return response.status(HttpStatus.CREATED).json(resp);
    // }

    @Get('index')
    async findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Advertising>> {
        return await this.advertisingService.findAll(query)
    }

    @Get("index/all")
    async categoryAllList(@Res() response): Promise<Advertising[]> {
        const cat = await this.advertisingService.findAllList();
        return response.status(HttpStatus.OK).json(cat);
    }


    @Get("/view/:id")
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.advertisingService.findOne(id);
    }

    // @Get("/view/:id")
    // async findOne(@Res() response, @Param('id') id) {
    //     const category = await this.advertisingService.findOneCategory(Number(id));

    //     return response.status(HttpStatus.OK).json(category);
    // }

    
    @Delete("/delete/:id")
    async delete(@Res() response, @Param('id') id) {
        const brand_ = await this.advertisingService.findOne(id);
        if (brand_) {
            const brand = await this.advertisingService.delete(id);
            return response.status(HttpStatus.OK).json({
                'statusCode': 1,
                'message': brand,
            });
        } else {
            return response.status(HttpStatus.OK).json({
                'statusCode': 0,
                'message': 'Advertising not found',
            });
        }
    }
}
