import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from '../brand/entities/Brand';
import { Product } from '../product/entities/Product';
import { AdvertisingController } from './advertising.controller';
import { Advertising } from './entities/Advertising';
import { AdvertisingService } from './service/advertising.service';
@Module({
    imports: [
        TypeOrmModule.forFeature([Advertising])
    ],
    controllers: [AdvertisingController],
    providers: [AdvertisingService],
})
export class AdvertisingModule { }
