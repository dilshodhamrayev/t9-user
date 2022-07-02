import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from '../brand/entities/Brand';
import { Category } from '../category/entities/Category';
import { Company } from '../company/entities/Company';
import { Product } from '../product/entities/Product';
import { Release } from '../release/entities/Release';
import { ReleaseService } from '../release/service/release.service';
import { StickerController } from './controllers/sticker.controller';
import { Sticker } from './entities/Sticker';
import { StickerService } from './services/sticker.service';
@Module({
    imports: [TypeOrmModule.forFeature([Sticker, Company, Brand, Category, Product, Release])],
    controllers: [StickerController],
    providers: [StickerService, ReleaseService]
})
export class StickerModule { }