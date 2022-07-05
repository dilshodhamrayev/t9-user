import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/User';
import { UserModule } from './user/user.module';
import { RegionModule } from './region/region.module';
import { Region } from './region/entities/Region';
import { CompanyModule } from './company/company.module';
import { Company } from './company/entities/Company';
import { PrizeModule } from './prize/prize.module';
import { Prize } from './prize/entities/Prize';
import { CategoryModule } from './category/category.module';
import { Category } from './category/entities/Category';
import { ProductModule } from './product/product.module';
import { Product } from './product/entities/Product';
import { StickerModule } from './sticker/sticker.module';
import { Sticker } from './sticker/entities/Sticker';
import { CompanyProductStatistics } from './company/entities/CompanyProductStatistics';
import { CompanyRegionStatistics } from './company/entities/CompanyRegionStatistics';
import { BrandModule } from './brand/brand.module';
import { Brand } from './brand/entities/Brand';
import { Release } from './release/entities/Release';
import { ReleaseModule } from './release/release.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryController } from './category/category.controller';
import { AuthMiddleware } from './auth/middleware/auth.middleware';
import { AuthModule } from './auth/auth.module';
import { BrandController } from './brand/brand.controller';
import { CompanyController } from './company/company.controller';
import { ProductController } from './product/product.controller';
import { StickerController } from './sticker/controllers/sticker.controller';
import { PrizeController } from './prize/prize.controller';
import { UserController } from './user/user.controller';
import { CompanyInfo } from './company/entities/CompanyInfo';
import { RegionController } from './region/region.controller';
import { ReleaseController } from './release/release.controller';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env_dev`
        }),
        TypeOrmModule.forRoot({
            type: "mysql",
            host: process.env.MYSQL_HOST,
            port: Number(process.env.MYSQL_PORT),
            username: process.env.MYSQL_USER,
            database: process.env.MYSQL_DB,
            password: process.env.MYSQL_PASSWORD,
            timezone: "UTC+5",
            entities: [User, Region, Company, Brand, CompanyInfo, Prize, Category, Product, Sticker, CompanyProductStatistics, CompanyRegionStatistics, Release],
            synchronize: true,
            dropSchema: false,
        }), UserModule, RegionModule, CompanyModule, PrizeModule, CategoryModule, ProductModule, StickerModule, BrandModule, ReleaseModule, AuthModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            // .exclude(
            //     { path: 'sticker', method: RequestMethod.GET },
            //     'sticker/(.*)',
            // )
            .forRoutes(CategoryController, BrandController, CompanyController, ProductController, StickerController, PrizeController, ReleaseController);
    }
}