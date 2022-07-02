import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FilterOperator, paginate, Paginated, PaginateQuery } from "nestjs-paginate";
import { Repository } from "typeorm";
import { StickerStatuses, StickerTypes } from "../../sticker/types";
import { Release } from "../entities/Release";
import { ReleaseStatuses } from "../types";

@Injectable()
export class ReleaseService {
    constructor(
        @InjectRepository(Release)
        private releaseRepository: Repository<Release>
    ) { }

    findAll(query: PaginateQuery): Promise<Paginated<Release>> {
        return paginate(
            query,
            this.releaseRepository
                .createQueryBuilder("release")
                .select(['release.id', 'release.from_id', 'release.to_id', 'release.sticker_active_count', 'release.created_at', 'release.type', 'release.chance', 'release.count', 'release.expire_date', 'release.status', 'company.full_name', 'product.title', 'category.title_ru'])
                .leftJoin("release.company", "company")
                .leftJoin("release.product", "product")
                .leftJoin("release.category", "category")
                .groupBy("release.id"),
            {
                sortableColumns: ['id', 'from_id', 'to_id', 'created_at', 'chance', 'count', 'status'],
                searchableColumns: ['from_id', 'to_id', 'created_at', 'chance', 'count', 'status', 'company.full_name', 'product.title', 'category.title_ru'],
                defaultSortBy: [
                    ['id', 'DESC']
                ],
                filterableColumns: {
                    status: [FilterOperator.EQ],
                    type: [FilterOperator.EQ],
                    chance: [FilterOperator.EQ],
                    "company.id": [FilterOperator.EQ],
                },
                relations: ['company', 'product', 'category']
            });
    }

    getChances(type: number, status: number) {
        return this.releaseRepository
            .createQueryBuilder()
            .select("chance")
            .where({ status, type })
            .groupBy("chance")
            .getRawMany();
    }

    findOne(id: number): Promise<Release> {
        return this.releaseRepository.findOne({
            select: ['id', 'from_id', 'to_id', 'count', 'chance', 'created_at', 'status', 'type'],
            where: {
                id
            }
        });
    }

    findLast(): Promise<Release> {
        return this.releaseRepository.findOne({
            order: {
                id: "DESC"
            }
        });
    }

    createRelease(release: Release): Promise<Release> {
        return this.releaseRepository.save(release);
    }

    save(release: Release): Promise<Release> {
        return this.releaseRepository.save(release);
    }

    getCount({ type, status, chance, company_id }: { type: StickerTypes, status: ReleaseStatuses, chance?: number, company_id?: number }) {
        let query = this.releaseRepository.createQueryBuilder('release')
            .where('release.status = :status', { status })
            .select("SUM(release.count)", 'count');

        if (type) {
            query.andWhere("release.type = :type", { type });
        }

        if (chance) {
            query.andWhere("release.chance = :chance", { chance });
        }

        if (company_id) {
            query.andWhere("release.company_id = :company_id", { company_id });
        }

        // console.log(query.getQueryAndParameters());
        

        return query.getRawOne();
    }
}