import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { storage } from 'utils/storage';
import { BrandDto } from './dto/brand.dto';
import { Brand } from './entities/Brand';
import { BrandService } from './service/brand.service';
@ApiTags("Brand")
@Controller('brand')
export class BrandController {
    constructor(private readonly brandService: BrandService) { }


    // @Get('cron')
    // cron(){
    //     this.brandService.cronService();
    // }


    // @UseInterceptors(FileInterceptor('file', storage('./uploads/brand/') ))
    // @Post('/create')
    // async createBrand(@Res() response, @Body() brand: BrandDto,@UploadedFile() file) {
    //     const data = file ? {...brand, image:'/uploads/brand/'+file.filename} : brand;

    //     const newBrand = await this.brandService.createBrand(data);
    //     let resp;

    //     if(newBrand){
    //         resp = { 'statusCode' : 1, ...newBrand };
    //     } else {
    //         resp = {
    //             'statusCode' : 0,
    //             'message' : 'Not saved',
    //             'model' : newBrand
    //          };
             
    //     }

    //     return response.status(HttpStatus.CREATED).json(resp);
    // }

    // @UseInterceptors(FileInterceptor('file', storage('./uploads/brand/')))
    // @Post('/update/:id')
    // async updateBrand(@Res() response, @Body() updatedBrandDto: BrandDto, @Param('id') id, @UploadedFile() file) {
    //     let resp;

    //     const brand = await this.brandService.findOne(id);

    //     if(brand){
    //         const data = file ? {...updatedBrandDto, image:'/uploads/brand/'+file.filename} : updatedBrandDto;
    //         const updatedBrand = await this.brandService.updateBrand(data, id);
            
    //         if(updatedBrand){
    //             resp = { 'statusCode' : 1, ...updatedBrand };
    //         } else {
    //             resp = { 'statusCode' : 0, 'message' : 'not updated' };
    //         }
    //     }
    //     else {
    //         resp = {
    //                 'statusCode' : 0,
    //                 'message' : 'Brand not found',
    //                 };
    //     }
    //     return response.status(HttpStatus.CREATED).json(resp);
    // }

    // @Get('/index')
    // async findAll(@Paginate() query: PaginateQuery):Promise<Paginated<Brand>> {
    //     return await this.brandService.findAll(query);
    // }

    // @Get('/index/all')
    // async findAllList(@Res() response) {
    //     const brands = await this.brandService.findAllList();

    //     return response.status(HttpStatus.OK).json(brands);
    // }

    // @Get('/index/:company_id')
    // async findByCompany(@Res() response, @Param('company_id') company_id: number) {
    //     const brands = await this.brandService.findByCompany(company_id);

    //     return response.status(HttpStatus.OK).json(brands);
    // }

    // @Get("/view/:id")
    // async findOne(@Res() response, @Param('id') id) {
    //     const brand = await this.brandService.findOne(id);

    //     return response.status(HttpStatus.OK).json(brand);
    // }

    // @Delete("/delete/:id")
    // async delete(@Res() response, @Param('id') id) {
    //     const brand_ = await this.brandService.findOne(id);
    //     if(brand_){
    //         const brand = await this.brandService.delete(id);
    //         return response.status(HttpStatus.OK).json( {
    //             'statusCode' : 1,
    //             'message' : brand,
    //             });
    //     } else {
    //         return response.status(HttpStatus.OK).json( {
    //             'statusCode' : 0,
    //             'message' : 'Brand not found',
    //             });
    //     }
    // }
}
