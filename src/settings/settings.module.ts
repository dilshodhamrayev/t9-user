import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from '../brand/entities/Brand';
import { Product } from '../product/entities/Product';
import { SettingsController } from './settings.controller';
import { Settings } from './entities/Settings';
import { SettingsService } from './service/settings.service';
@Module({
    imports: [
        TypeOrmModule.forFeature([Settings])
    ],
    controllers: [SettingsController],
    providers: [SettingsService],
})
export class SettingsModule { }
