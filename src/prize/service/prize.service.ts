import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectRepository } from "@nestjs/typeorm";
import { Company } from "../../company/entities/Company";
import { Repository } from "typeorm";
import { PrizeDto } from "../dto/prize.dto";
import { Prize } from "../entities/Prize";
import { FilterOperator, paginate, Paginated, PaginateQuery } from "nestjs-paginate";
import { Connection } from "mysql2";

@Injectable()
export class PrizeService {
    constructor(
        @InjectRepository(Prize) private prizeRepository: Repository<Prize>,
        @InjectRepository(Company) private companyRepository: Repository<Company>,
        @InjectConnection() private readonly connection: Connection
    ) { }

    findAll(query: PaginateQuery, status: number, type: number): Promise<Paginated<Prize>> {
        return paginate(query,
            this.prizeRepository
                .createQueryBuilder('prize')
                .leftJoin('prize.company', 'company')
                .select(["prize.id", 'prize.title_uz', 'prize.title_ru', 'prize.title_en', 'prize.count', 'prize.type', 'prize.raffle_date', 'prize.created_date'])
                .addSelect("company.full_name")
                .where('prize.type = :type and prize.status = :status', { type, status }),
            {
                sortableColumns: ['id', 'title_uz', 'title_ru', 'title_en', 'count', 'type', 'raffle_date'],
                searchableColumns: ['id', 'title_uz', 'title_ru', 'title_en', 'count', 'type', 'raffle_date', 'company.full_name'],
                defaultSortBy: [
                    ['id', 'DESC']
                ],
                filterableColumns: {
                    id: [FilterOperator.IN],
                },
                relations: ['company']
            });
    }

    findOne(id: number): Promise<Prize> {
        return this.prizeRepository.findOne({
            select: ['id', 'title_uz', 'title_ru', 'title_en', 'image', 'count', 'type', 'raffle_date', 'status'],
            relations: ['company'],
            where: {
                id
            }
        });
    }

    async delete(id: number) {
        return await this.connection.query(`DELETE FROM prize WHERE id=${id}`);
    }

    async createPrize(prize: PrizeDto): Promise<Prize> {

        const company_id = Number(prize.company_id);
        const company = await this.companyRepository.findOne({
            select: ['id', 'username', 'password_hash', 'status', 'full_name', 'auth_key', 'created_at', 'region'],
            where: {
                id: company_id
            }
        });

        if (company || true) {
            const br = new Prize();
            br.title_uz = prize.title_uz;
            br.title_ru = prize.title_ru;
            br.title_en = prize.title_en;
            br.count = prize.count;
            br.status = prize.status;
            br.type = prize.type;
            br.raffle_date = prize.raffle_date;
            br.created_date = prize.created_date;
            br.company = company;
            if (prize.image) {
                br.image = prize.image;
            }
            return this.prizeRepository.save(br);
        } else {
            return null;
        }

        // return this.prizeRepository.save(prize);
    }

    async updatePrize(prize: PrizeDto, id: number): Promise<Prize> {
        const company_id = Number(prize.company_id);
        const company = await this.companyRepository.findOne({
            select: ['id', 'username', 'password_hash', 'status', 'full_name', 'auth_key', 'created_at', 'region'],
            where: {
                id: company_id
            }
        });

        const prize_ = await this.findOne(id);

        if (company && prize_) {
            prize_.title_uz = prize.title_uz;
            prize_.title_ru = prize.title_ru;
            prize_.title_en = prize.title_en;
            prize_.count = prize.count;
            prize_.status = prize.status;
            prize_.type = prize.type;
            prize_.raffle_date = prize.raffle_date;
            prize_.created_date = prize.created_date;
            prize_.company = company;

            if (prize.image) {
                prize_.image = prize.image;
            }
            return this.prizeRepository.save(prize_);
        } else {
            return null;
        }
    }
}