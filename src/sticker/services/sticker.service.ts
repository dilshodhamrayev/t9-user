import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectConnection, InjectRepository } from "@nestjs/typeorm";
import { FilterOperator, paginate, Paginated, PaginateQuery } from "nestjs-paginate";
import { In, Repository } from "typeorm";
import { Sticker } from "../entities/Sticker";
import { StickerStatuses, StickerTypes } from "../types";

var vaucherGenerator = require("voucher-code-generator");
@Injectable()
export class StickerService {
    constructor(
        @InjectRepository(Sticker)
        private stickerRepository: Repository<Sticker>
    ) { }

    async getByUser(query: PaginateQuery, id: number, status : number): Promise<Paginated<Sticker>> {

        return paginate(query, this.stickerRepository.createQueryBuilder('sticker')
            .leftJoinAndSelect('sticker.product', 'product')
            .leftJoinAndSelect('sticker.user', 'user')
            .where('user.id = :id and sticker.status = :status', { id, status }), {
            // relations: ['company'],
            sortableColumns: ['id'],
            searchableColumns: ['id'],
            defaultSortBy: [
                ['id', 'DESC']
            ],
            filterableColumns: {
                id: [FilterOperator.IN],
            },
        });

        // return this.stickerRepository.find({
        //     select: ["code", "type", 'chance', 'registered_date', 'product'],
        //     relations: {product : true},
        //     where: {
        //         user: {id:id}
        //     }
        // })
    }

    async getAll(){
        return await this.stickerRepository.find({
            // select: ['product.title'],
            order: {
                registered_date: "DESC"
            },
            relations : {
                user:true,
                product: true,
                brand: true
            },
            where: {
                status : StickerStatuses.REGISTERED
            },
            select : ['product', 'code', 'registered_date', 'user', 'brand']
        })
      }
}