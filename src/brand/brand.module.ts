import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from '../company/entities/Company';
import { BrandController } from './brand.controller';
import { Brand } from './entities/Brand';
import { BrandService } from './service/brand.service';

@Module({
  imports: [TypeOrmModule.forFeature([Brand, Company])],
  controllers: [BrandController],
  providers: [BrandService],
})
export class BrandModule { }
