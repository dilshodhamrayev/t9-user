import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectConnection, InjectRepository } from "@nestjs/typeorm";
import { Connection } from "mysql2";
import { FilterOperator, paginate, Paginated, PaginateQuery } from "nestjs-paginate";
import { Repository } from "typeorm";
import { Advertising } from "../entities/Advertising";
import { PLACES, STATUSES, TYPES } from "../types";

@Injectable()
export class AdvertisingService {
    constructor(
        @InjectRepository(Advertising) private advertisingRepository: Repository<Advertising>,
        @InjectConnection() private readonly connection: Connection
    ) { }

    // findOne(id: number) {
    //     return this.advertisingRepository.findOne({
    //         select: ['id'],
    //         where: {
    //             id
    //         },
            
    //     });
    // }

    // async delete(id: number) {
    //     return await this.connection.query(`DELETE FROM advertising WHERE id=${id}`);
    // }

    // async createCategory(category: CategoryDto): Promise<Category> {
    //     let parent = null
    //     if (category.parent_id) {
    //         parent = await this.findOne(category.parent_id)
    //     }

    //     const cat_ = new Category();

    //     cat_.title_uz = category.title_uz;
    //     cat_.title_ru = category.title_ru;
    //     cat_.title_en = category.title_en;
    //     cat_.status = category.status;
    //     cat_.priority = category.priority;
    //     cat_.level = category.level;
    //     cat_.parent = parent;

    //     if (category.image) {
    //         cat_.image = category.image;
    //     }
    //     return this.advertisingRepository.save(cat_);

    // }

    // async updateCategory(categoryUpdated: CategoryDto, id: number): Promise<Category> {

    //     const cat_ = await this.findOne(id);

    //     let parent = null
    //     if (categoryUpdated.parent_id) {
    //         parent = await this.findOne(categoryUpdated.parent_id)
    //     }

    //     if (cat_) {
    //         cat_.title_uz = categoryUpdated.title_uz;
    //         cat_.title_ru = categoryUpdated.title_ru;
    //         cat_.title_en = categoryUpdated.title_en;
    //         cat_.status = categoryUpdated.status;
    //         cat_.priority = categoryUpdated.priority;
    //         cat_.level = categoryUpdated.level;

    //         cat_.parent = parent;

    //         if (categoryUpdated.image) {
    //             cat_.image = categoryUpdated.image;
    //         }
    //         return this.advertisingRepository.save(cat_);
    //     } else {
    //         return null;
    //     }
    // }
}