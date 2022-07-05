import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectRepository } from "@nestjs/typeorm";
import { Connection } from "mysql2";
import { Repository } from "typeorm";
import { Region } from "../entities/Region";

@Injectable()
export class RegionService {
    constructor(
        @InjectRepository(Region)
        private regionRepository: Repository<Region>,
        @InjectConnection() private readonly connection: Connection
    ) { }

    findAll() {
        return this.connection.query(`SELECT * FROM region WHERE parent_id is null`);
    }

    
    findAllchild(id: number):any {
        return this.regionRepository.find({
            select: ['id', 'title_uz', 'title_ru', 'title_en', 'level', 'priority', 'status'],
            where: {
                'parent_id' : id
            }
        });
    }
  
}