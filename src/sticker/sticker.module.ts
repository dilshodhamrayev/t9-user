import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../user/services/user.service';
import { Brand } from '../brand/entities/Brand';
import { Category } from '../category/entities/Category';
import { Company } from '../company/entities/Company';
import { Product } from '../product/entities/Product';
import { Release } from '../release/entities/Release';
import { ReleaseService } from '../release/service/release.service';
import { StickerController } from './controllers/sticker.controller';
import { Sticker } from './entities/Sticker';
import { StickerService } from './services/sticker.service';
import { User } from '../user/entities/User';
import { CompanyInfo } from '../company/entities/CompanyInfo';
import { Prize } from '../prize/entities/Prize';
import { Region } from '../region/entities/Region';

@Module({
    imports: [TypeOrmModule.forFeature([Sticker, Company, CompanyInfo, Brand,Sticker, Prize, Region, User, Product, Category, Release])],
    controllers: [StickerController],
    providers: [StickerService, UserService, ReleaseService]
})
export class StickerModule { }