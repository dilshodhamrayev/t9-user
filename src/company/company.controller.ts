import { DefaultValuePipe, Delete, ParseIntPipe, Patch, Put, Query, UploadedFile, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateCompanyDto } from './dto/update-company';
import { Company } from './entities/Company';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { CompanyService } from './service/company.service';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Sticker } from '../sticker/entities/Sticker';
import { Prize } from '../prize/entities/Prize';
import { Brand } from '../brand/entities/Brand';
import { BrandService } from '../brand/service/brand.service';
import { CompanyInfoDto } from './dto/company-info';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { CreateCompanyInfoDto } from './dto/create-company-info';

@ApiTags("Company")
@Controller('company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService, private readonly brandService: BrandService) { }

    @Get('statistics')
    async findStatistics(){
        return await this.companyService.statistics();
    }
    
    @Get('/index')
    async findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Company>> {
        return await this.companyService.findAll(query);
    }

    @Get("index/all")
    async companyAllList(@Res() response):Promise<Company[]> {
            const company= await this.companyService.findAllList();
            return response.status(HttpStatus.OK).json(company);
    }

    @Get("view/:id")
    async companyView(@Res() response,@Param('id', ParseIntPipe) id: number):Promise<Company[]> {
            const company= await this.companyService.findOne(id);
            return response.status(HttpStatus.OK).json(company);
    }

    // @Get("sticker/:id")
    // async companyStickers(@Res() response,@Param('id', ParseIntPipe) id: number):Promise<Sticker[]> {
    //         const company_sticker= await this.companyService.companyStickers(id);
    //         return response.status(HttpStatus.OK).json(company_sticker);
    // }


    @Get("sticker/:id")
    async companyStickers(@Param('id', ParseIntPipe) id: number, @Paginate() query: PaginateQuery): Promise<Paginated<Sticker>> {
        return await this.companyService.companyStickers(id,query);
    }

    // @Get("prize/:id")
    // async companyPrize(@Res() response,@Param('id', ParseIntPipe) id: number):Promise<Prize[]> {
    //         const company_prize= await this.companyService.companyPrize(id);
    //         return response.status(HttpStatus.OK).json(company_prize);
    // }
    @Get("prize/:id")
    async companyPrize(@Param('id', ParseIntPipe) id: number, @Paginate() query: PaginateQuery): Promise<Paginated<Prize>> {
        return await this.companyService.companyPrize(id,query);
    }

    @Get("brands/:id")
    async companyBrands(@Res() response,@Param('id', ParseIntPipe) id: number):Promise<Brand[]> {
            const company_brand= await this.companyService.companyBrands(id);
            return response.status(HttpStatus.OK).json(company_brand);
    }

    @Get("brand/:company_id/:brand_id")
    async companyBrand(@Res() response, @Param('company_id', ParseIntPipe,) company_id: number, @Param('brand_id', ParseIntPipe) brand_id: number,@Paginate() query: PaginateQuery): Promise<Paginated<Company>> {
            const company_brand_sticker = await this.companyService.companyBrandSticker(company_id, brand_id,query);
            const brand = await this.brandService.findOne(brand_id)
            
            return response.status(HttpStatus.OK).json(
                { company_brand_sticker, brand}
            );
    }


    @Get("brand_count")
    async brandCount(@Res() response) {
        const brand_count = await this.companyService.brandCount();
        return response.status(HttpStatus.OK).json({
            brand_count
        });
    }


    @Post("create")
    @UsePipes(ValidationPipe)
    async createCompany(@Res() response, @Body() company: CreateCompanyInfoDto) {
        const { auth_key, password_hash, ...rest } = company;
        const saltRounds = 12;
        let hashedPassword = await bcrypt.hash(password_hash, saltRounds);
        let key = crypto.randomBytes(64).toString('hex');
        const data = {...company, password_hash:hashedPassword,auth_key:key}
        const newCompany = await this.companyService.createCompany(data);
        let resp;

        if(newCompany){
            resp = { 'statusCode' : 1, 'message' : 'success' };
        } else {
            resp = { 'statusCode' : 0, 'message' : 'not created' };
        }

        return response.status(HttpStatus.CREATED).json(resp);
    }
    
    @Put('update-company/:id')
    async update(@Res() response, @Param('id') id: number, @Body() updateCompanyDto: UpdateCompanyDto) {
        
        let resp;
        const company = this.companyService.findOne(id);

        if(company){

            let data;

            if(updateCompanyDto.password_hash && updateCompanyDto.password_hash.length > 0){
                const saltRounds = 12;
                let hashedPassword = await bcrypt.hash(updateCompanyDto.password_hash, saltRounds);
                let key = crypto.randomBytes(64).toString('hex');
                data = {...updateCompanyDto, password_hash:hashedPassword, auth_key:key}
            } else {
                data = updateCompanyDto;
            }
            
            const updatedComp = await this.companyService.update(+id, data);

            if(updatedComp){
                resp = { 'statusCode' : 1, 'message' : 'success' };
            } else {
                resp = { 'statusCode' : 0, 'message' : 'not updated' };
            }
        }
        else {
            resp = { 'statusCode' : 0, 'message' : 'Company not found' };
        }
        return response.status(HttpStatus.CREATED).json(resp);

    }

    @Put('update-info/:id')
    updateInfo(@Res() response, @Param('id') id: number, @Body() updateCompanyDto: any) {
        let resp;
        const company = this.companyService.findOne(id);

        if(company){
            
            const updatedCompInfo = this.companyService.updateInfo(+id, updateCompanyDto);
            if(updatedCompInfo){
                resp = { 'statusCode' : 1, 'message' : 'success' };
            } else {
                resp = { 'statusCode' : 0, 'message' : 'not updated' };
            }
        }
        else {
            resp = { 'statusCode' : 0, 'message' : 'Company not found' };
        }
        return response.status(HttpStatus.CREATED).json(resp);

    }

    @Delete("/delete/:id")
    async delete(@Res() response, @Param('id') id) {
        const comp_ = await this.companyService.findOne(id);
        if(comp_){
            const comp = await this.companyService.delete(id);
            return response.status(HttpStatus.OK).json( {
                'statusCode' : 1,
                'message' : 'Deleted',
                });
        } else {
            return response.status(HttpStatus.OK).json( {
                'statusCode' : 0,
                'message' : 'comp not found',
                });
        }
    }
}
