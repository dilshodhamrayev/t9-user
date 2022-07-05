import { Delete, ParseIntPipe, Query, UploadedFile } from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common';
import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductDto } from './dto/product.dto';
import { Product } from './entities/Product';
import { ProductService } from './service/product.service';
import { ApiTags } from '@nestjs/swagger';
import { storage } from 'utils/storage';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
@ApiTags("Product")
@Controller('product')
export class ProductController {
    
    constructor(private readonly productService: ProductService) { }
    
    // @Post('create')
    // @UseInterceptors(FileInterceptor('file',storage('./uploads/product/')))
    // async createProduct(@Res() response, @Body() product: ProductDto, @UploadedFile() file) {
    //     const data = file ? {...product, image: '/uploads/product/'+file.filename} : product;
    //     const newProduct = await this.productService.createProduct(data);

    //     let resp;
    //     if(newProduct){
    //         resp = { 'statusCode' : 1, ...newProduct };
    //     } else {
    //         resp = {
    //             'statusCode' : 0,
    //             'message' : 'Not saved',
    //             'model' : newProduct
    //          };
             
    //     }

    //     return response.status(HttpStatus.CREATED).json(resp);

    // }

    // @UseInterceptors(FileInterceptor('file',storage('./uploads/product/')))
    // @Post('/update/:id')
    // async updateProduct(@Res() response, @Body() product: ProductDto, @Param('id') id, @UploadedFile() file) {
        
    //     let resp;
    //     const product_ = await this.productService.findOne(id);
    //     if(product_){
    //         const data = file ? {...product, image: '/uploads/product/'+file.filename} : product;
    //         const newProduct = await this.productService.updateProduct(data, id);
    
    //         if(newProduct){
    //             resp = { 'statusCode' : 1, ...newProduct };
    //         } else {
    //             resp = {
    //                 'statusCode' : 0,
    //                 'message' : 'Not saved',
    //                 'model' : newProduct
    //              };
                 
    //         }
    //     }

    //     return response.status(HttpStatus.CREATED).json(resp);
    // }

    // @Get('index')
    // async findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Product>> {
    //     return await this.productService.findAll(query);
    // }

    // @Get('index/:company_id/:category_id')
    // async findByCompanyAndCategory(@Param("company_id") company_id: number, @Param("category_id") category_id: number): Promise<Product[]> {
    //     return await this.productService.findByCompanyAndCategory(company_id, category_id);
    // }

    // @Get("view/:id")
    // async findOne(@Res() response, @Param('id') id) {
    //     const product = await this.productService.findOne(id);
    //     return response.status(HttpStatus.OK).json({
    //         product
    //     });
    // }
    // @Delete('delete/:id')
    // remove(@Param('id',ParseIntPipe) id: number) {
    //     return this.productService.delete(id)
    // }

    // @Get("count")
    // async getCounts() {
    //     return await this.productService.getCount();
    // }
}
