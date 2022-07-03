import { Body, Controller, Get, HttpStatus, Param, Post, Res, UseGuards, UploadedFile, UseInterceptors, Delete, ParseIntPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { storage } from 'utils/storage';
import { Product } from '../product/entities/Product';
import { CategoryDto } from './dto/category.dto';
import { Category } from './entities/Category';
import { CategoryService } from './service/category.service';
@ApiTags("Category")
@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @UseInterceptors(FileInterceptor('file', storage('./uploads/category/')))
    @Post('create')
    async createCategory(@Res() response, @Body() category: CategoryDto, @UploadedFile() file) {
        const data = file ? { ...category, image: '/uploads/category/' + file.filename } : category;
        const newCategory = await this.categoryService.createCategory(data);
        let resp;
        if (newCategory) {
            resp = { 'statusCode': 1, ...newCategory };
        } else {
            resp = { 'statusCode': 0, 'message': 'Not saved' }
        }
        return response.status(HttpStatus.CREATED).json(resp);
    }

    @UseInterceptors(FileInterceptor('file', storage('./uploads/category/')))
    @Post('/update/:id')
    async updateCategory(@Res() response, @Body() updatedCategoryDto: CategoryDto, @Param('id') id, @UploadedFile() file) {
        let resp;

        const category = await this.categoryService.findOne(id);

        if (category) {
            const data = file ? { ...updatedCategoryDto, image: '/uploads/category/' + file.filename } : updatedCategoryDto;
            const updatedCategory = await this.categoryService.updateCategory(data, id);

            if (updatedCategory) {
                resp = { 'statusCode': 1, ...updatedCategory };
            } else {
                resp = { 'statusCode': 0, 'message': 'not updated' };
            }
        }
        else {
            resp = { 'statusCode': 0, 'message': 'category not found' };
        }
        return response.status(HttpStatus.CREATED).json(resp);
    }

    @Get('index')
    async findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Category>> {
        return await this.categoryService.findAll(query)
    }

    @Get("index/all")
    async categoryAllList(@Res() response): Promise<Category[]> {
        const cat = await this.categoryService.findAllList();
        return response.status(HttpStatus.OK).json(cat);
    }

    @Get("index/:brand_id")
    async findByBrand(@Res() response, @Param("brand_id") brand_id: number): Promise<Category[]> {
        const cat = await this.categoryService.findByBrand(brand_id);
        return response.status(HttpStatus.OK).json(cat);
    }

    @Get("parents")
    async categoryAllParent(@Res() response) {
        const cat = await this.categoryService.findAllParent();
        return response.status(HttpStatus.OK).json(cat);
    }

    @Get("/view/:id")
    async findOne(@Param('id', ParseIntPipe) id: number, @Paginate() query: PaginateQuery): Promise<Paginated<Product>> {
        return await this.categoryService.findOneCategory(id, query);

    }

    // @Get("/view/:id")
    // async findOne(@Res() response, @Param('id') id) {
    //     const category = await this.categoryService.findOneCategory(Number(id));

    //     return response.status(HttpStatus.OK).json(category);
    // }

    @Get("/view-category/:id")
    async findOnlyCategory(@Res() response, @Param('id') id) {
        const category = await this.categoryService.findOne(Number(id));

        return response.status(HttpStatus.OK).json(category);
    }

    @Delete("/delete/:id")
    async delete(@Res() response, @Param('id') id) {
        const brand_ = await this.categoryService.findOne(id);
        if (brand_) {
            const brand = await this.categoryService.delete(id);
            return response.status(HttpStatus.OK).json({
                'statusCode': 1,
                'message': brand,
            });
        } else {
            return response.status(HttpStatus.OK).json({
                'statusCode': 0,
                'message': 'Brand not found',
            });
        }
    }
}
