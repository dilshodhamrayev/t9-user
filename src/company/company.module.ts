import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from '../brand/entities/Brand';
import { User } from '../user/entities/User';
import { Sticker } from '../sticker/entities/Sticker';
import { Prize } from '../prize/entities/Prize';
import { Region } from '../region/entities/Region';
import { Release } from '../release/entities/Release';
import { Product } from '../product/entities/Product';
import { Category } from '../category/entities/Category';
import { CompanyController } from './company.controller';
import { Company } from './entities/Company';
import { CompanyService } from './service/company.service';
import { BrandService } from '../brand/service/brand.service';
import { CompanyInfo } from './entities/CompanyInfo';

@Module({
  imports: [TypeOrmModule.forFeature([Company, CompanyInfo, Brand,Sticker, Prize, Region, User, Product, Category, Release])],
  controllers: [CompanyController],
  providers: [CompanyService, BrandService],
})
export class CompanyModule { }
