import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Region } from "../entities/Region";

@Injectable()
export class RegionService {
    constructor(
        @InjectRepository(Region)
        private regionRepository: Repository<Region>
    ) { }

    findAll(): Promise<Region[]> {
        return this.regionRepository.find({});
    }

    findByCompany(company_id : number) {
        

        return this.regionRepository.find({
            relations : {
                companyRegionStatistics : true
            },
            where: {
                companyRegionStatistics : {
                    company : {id : company_id}
                }
            }
        })
    }
    findByCompanyBrand(company_id : number, brand_id: number) {

        return this.regionRepository.find({
            relations : {
                companyRegionStatistics : true
            },
            where: {
                companyRegionStatistics : {
                    company : {id : company_id},
                    brand : {id : brand_id},
                }
            }
        })
    }

    findOne(id: number): Promise<Region> {
        return this.regionRepository.findOne({
            select: ['id', 'title_uz', 'title_ru', 'title_en', 'level', 'priority', 'status'],
            where: {
                id
            }
        });
    
    }
    findAllchild(id: number): Promise<Region> {
        return this.regionRepository.findOne({
            select: ['id', 'title_uz', 'title_ru', 'title_en', 'level', 'priority', 'status'],
            where: {
                'parent_id' : id
            }
        });
    }

    createRegion(region: Region): Promise<Region> {
        return this.regionRepository.save(region);
    }

    async updateRegion(region: Region, id: number): Promise<Region> {
        const reg_ = await this.findOne(id);
        if(reg_){
            reg_.title_uz = region.title_uz;
            reg_.title_en = region.title_en;
            reg_.title_ru = region.title_ru;
            reg_.status = region.status;
            reg_.level = region.level;
            reg_.priority = region.priority;
            reg_.parent_id = region.parent_id;
            return this.regionRepository.save(reg_);
        }
        else 
            return null;
    }
}