import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdvertisingConnectController } from './advertisingConnect.controller';
import { AdvertisingConnect } from './entities/advertisingConnect';
import { AdvertisingConnectService } from './service/advertisingConnect.service';
@Module({
    imports: [
        TypeOrmModule.forFeature([AdvertisingConnect])
    ],
    controllers: [AdvertisingConnectController],
    providers: [AdvertisingConnectService],
})
export class AdvertisingConnectModule { }
