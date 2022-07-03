import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prize } from './entities/Prize';
import { PrizeController } from './prize.controller';
import { PrizeService } from './service/prize.service';
import { Company } from '../company/entities/Company';

@Module({
  imports: [TypeOrmModule.forFeature([Prize, Company])],
  controllers: [PrizeController],
  providers: [PrizeService]
})
export class PrizeModule { }
