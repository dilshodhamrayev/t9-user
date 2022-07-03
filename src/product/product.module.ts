import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from '../company/entities/Company';
import { Brand } from '../brand/entities/Brand';
import { Category } from '../category/entities/Category';
import { Product } from './entities/Product';
import { ProductController } from './product.controller';
import { ProductService } from './service/product.service';

@Module({
  controllers: [ProductController],
  imports: [TypeOrmModule.forFeature([Product, Company, Brand, Category])],
  providers: [ProductService]
})
export class ProductModule { }
