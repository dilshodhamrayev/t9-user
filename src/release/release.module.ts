import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Release } from './entities/Release';
import { ReleaseController } from './release.controller';
import { ReleaseService } from './service/release.service';

@Module({
  imports: [TypeOrmModule.forFeature([Release])],
  providers: [ReleaseService],
  controllers: [ReleaseController]
})
export class ReleaseModule {}
