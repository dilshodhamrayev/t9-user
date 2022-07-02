import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Region } from './entities/Region';
import { RegionController } from './region.controller';
import { RegionService } from './service/region.service';

@Module({
  imports: [TypeOrmModule.forFeature([Region])],
  providers: [RegionService],
  controllers: [RegionController]
})
export class RegionModule {}
