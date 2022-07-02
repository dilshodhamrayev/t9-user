import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectConnection, InjectRepository } from "@nestjs/typeorm";
import { Connection, In, Repository } from "typeorm";
import { STICKER_CODE_LENGTH } from "../../../utils/conts";
import { incrementID } from "../../../utils/functions";
import { Brand } from "../../brand/entities/Brand";
import { Category } from "../../category/entities/Category";
import { Company } from "../../company/entities/Company";
import { Product } from "../../product/entities/Product";
import { ReleaseDto } from "../../release/dto/release.dto";
import { Release } from "../../release/entities/Release";
import { ReleaseStatuses } from "../../release/types";
import { Sticker } from "../entities/Sticker";
import { StickerStatuses, StickerTypes } from "../types";

var vaucherGenerator = require("voucher-code-generator");
@Injectable()
export class StickerService {
    constructor(
        @InjectRepository(Sticker)
        private stickerRepository: Repository<Sticker>,
        @InjectRepository(Company)
        private companyRepository: Repository<Company>,
        @InjectRepository(Brand)
        private brandRepository: Repository<Brand>,
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @InjectRepository(Release)
        private releaseRepository: Repository<Release>
    ) { }

    async generateStickers(release: Release, year: string, type: StickerTypes) {
        let saved = 0;

        let from_id = release.from_id;

        while (saved < release.count) {
            const sticker = new Sticker();

            sticker.code = vaucherGenerator.generate({ length: STICKER_CODE_LENGTH, count: 1, charset: "0123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ" })[0];
            sticker.type = type;
            sticker.generated_id = from_id;
            sticker.release = release;
            sticker.year = Number.parseInt(year);
            sticker.chance = release.chance;
            sticker.status = StickerStatuses.WAITING_OWNDER;

            try {
                await this.stickerRepository.save(sticker);
                from_id = incrementID(from_id);
                saved++;
            } catch (ex) {
                // console.log(ex.driverError?.code);
            }
        }

        return saved;
    }

    async getStickersForExcel(release: Release) {
        return this.stickerRepository.find({
            select: ["generated_id", "code"],
            where: {
                release
            }
        })
    }

    async attach(release: Release, data: ReleaseDto) {

        if (!release) throw new NotFoundException("Release not found");

        let company = await this.companyRepository.findOne({
            where: {
                id: data.company_id
            }
        });

        if (!company) throw new NotFoundException("Company not found");

        let brand = await this.brandRepository.findOne({
            where: {
                id: data.brand_id
            }
        });

        if (!brand) throw new NotFoundException("Brand not found");

        let category = await this.categoryRepository.findOne({
            where: {
                id: data.category_id
            }
        });

        if (!category) throw new NotFoundException("Category not found");

        let product = await this.productRepository.findOne({
            where: {
                id: data.product_id
            }
        });

        if (!product) throw new NotFoundException("Product not found");

        release.amount_paid = data.amount_paid;
        release.product_price = data.product_price;
        release.sticker_price = data.sticker_price;
        release.expire_date = data.expire_date;

        release.company = company;
        release.brand = brand;
        release.category = category;
        release.product = product;

        release.status = ReleaseStatuses.SHARED;

        let r = await this.releaseRepository.save(release);

        if (r) {
            await this.stickerRepository
                .createQueryBuilder()
                .update()
                .set({
                    category,
                    company,
                    brand,
                    product,
                    product_price: release.product_price,
                    sticker_price: release.sticker_price,
                    expire_date: release.expire_date,
                    status: StickerStatuses.WAITING_REGISTER
                })
                .where('release_id = :release_id', { release_id: release.id })
                .execute();
        }

        return r;
    }

    getActiveStickersCount({ type, chance, company_id }) {
        

        let query = this.stickerRepository.createQueryBuilder('sticker')
            .where("sticker.type = :type", { type })
            .andWhere('sticker.status = :status', { status: StickerStatuses.REGISTERED })
            .select("COUNT(id)", 'count');

        if (chance) {
            query.andWhere("sticker.chance = :chance", { chance });
        }

        if (company_id) {
            query.andWhere("sticker.company_id = :company_id", { company_id });
        }

        return query.getRawOne();
    }

    getActiveStatistics({ type, status }: { type: StickerTypes, status: StickerStatuses[] }) {
        let query = this.stickerRepository.createQueryBuilder("sticker")
            .where("sticker.type = :type", { type })
            .andWhere({
                status: In(status)
            })
            .select("SUM(sticker.id)", "count");

        return query.getRawOne();
    }
}