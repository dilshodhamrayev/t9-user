import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from '../brand/entities/Brand';
import { Product } from '../product/entities/Product';
import { CategoryController } from './category.controller';
import { Category } from './entities/Category';
import { CategoryService } from './service/category.service';
@Module({
    imports: [
        TypeOrmModule.forFeature([Category, Product, Brand])
    ],
    controllers: [CategoryController],
    providers: [CategoryService],
})
export class CategoryModule { }
