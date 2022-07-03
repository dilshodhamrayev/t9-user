import { HttpStatus, Injectable, Res } from "@nestjs/common";
import { InjectConnection, InjectRepository } from "@nestjs/typeorm";
import { Raw, Repository } from "typeorm";
import { Brand } from "../../brand/entities/Brand";
import { User } from "../../user/entities/User";
import { Product } from "../../product/entities/Product";
import { Category } from "../../category/entities/Category";
import { Sticker } from "../../sticker/entities/Sticker";
import { Release } from "../../release/entities/Release";
import { Prize } from "../../prize/entities/Prize";
import { Region } from "../../region/entities/Region";
import { UpdateCompanyDto } from "../dto/update-company";
import { Company } from "../entities/Company";
import { CompanyInfoDto } from "../dto/company-info";
import { CompanyInfo } from "../entities/CompanyInfo";
import { FilterOperator, paginate, Paginated, PaginateQuery } from "nestjs-paginate";
import { CreateCompanyInfoDto } from "../dto/create-company-info";
import { Connection } from "mysql2";
import { PrizeStatuses } from "../../prize/types";

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(Company) private companyRepository: Repository<Company>,
        @InjectRepository(CompanyInfo) private companyInfoRepository: Repository<CompanyInfo>,
        @InjectRepository(Sticker) private stickerRepository: Repository<Sticker>,
        @InjectRepository(Release) private releaseRepository: Repository<Release>,
        @InjectRepository(Prize) private prizeRepository: Repository<Prize>,
        @InjectRepository(Region) private regionRepository: Repository<Region>,
        @InjectRepository(Brand) private brandRepository: Repository<Brand>,
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Product) private productRepository: Repository<Product>,
        @InjectRepository(Category) private categoryRepository: Repository<Category>,
        @InjectConnection() private readonly connection: Connection
    ) { }

    async statistics() {

        const monthCompanyCount = await this.companyRepository.countBy({
            created_at: Raw((alias) => `${alias} > ADDDATE(CURRENT_DATE(), INTERVAL -(DAY(NOW())) DAY)`),
        })
        const companyCount = await this.companyRepository.count()

        const monthUserCount = await this.userRepository.countBy({
            created_at: Raw((alias) => `${alias} > ADDDATE(CURRENT_DATE(), INTERVAL -(DAY(NOW())) DAY)`),
        })
        const userCount = await this.userRepository.count()

        const productList = await this.productRepository.find({
            order: {
                sticker_active_count: "DESC"
            },
            skip: 0,
            take: 5,
        })

        const categoryList = await this.categoryRepository.find({
            order: {
                active_sticker_count: "DESC"
            },
            skip: 0,
            take: 5,
        })

        const brandList = await this.brandRepository.find({
            order: {
                active: "DESC"
            },
            skip: 0,
            take: 5,
        })

        const companyList = await this.companyRepository.find({
            select: ['full_name', 'sticker_active_count', 'sticker_count'],
            order: {
                sticker_active_count: "DESC"
            },
            skip: 0,
            take: 5,
        })

        const prizeList = await this.prizeRepository.find({
            where: {
                status: PrizeStatuses.WAITING_WINNER
            },
            order: {
                raffle_date: "DESC"
            },
            skip: 0,
            take: 5,
        })

        const regionList = await this.regionRepository.find({
            where: {
                parent_id: null
            }
        })

        const winnerPrizeCount = await this.userRepository.count({
            relations: {
                stickers: true
            },
            where: {
                stickers: {
                    prize: true
                }
            }
        })

        const winnerCount = await this.userRepository.count({
            relations: {
                stickers: true
            },
        })

        //.createQueryBuilder('user').innerJoinAndSelect('user.stickers','stickers').innerJoinAndSelect('stickers.prize','prize');

        return {
            monthCompanyCount,
            companyCount,
            monthUserCount,
            userCount,
            productList,
            categoryList,
            brandList,
            companyList,
            prizeList,
            regionList,
            winnerPrizeCount,
            winnerCount
        }

    }

    findAllList(): Promise<Company[]> {
        return this.companyRepository.find({
            relations: {
                info: true
            }
        });
    }


    findOne(id: number): Promise<Company> {
        return this.companyRepository.findOne({
            select: ['id', 'username', 'full_name', 'position'],
            where: {
                id
            },
            relations: {
                info: true,
                region: true
            }
        });
    }

    companyStickers(id: number, query: PaginateQuery): Promise<Paginated<Sticker>> {
        return paginate(query, this.stickerRepository.createQueryBuilder('sticker')
            .leftJoinAndSelect('sticker.company', 'company')
            .leftJoinAndSelect('sticker.product', 'product')
            .leftJoinAndSelect('sticker.category', 'category')
            .where('company.id = :id', { id }), {
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
    }
    // companyStickers(id: number) {
    //     return this.stickerRepository.find({
    //         relations : {
    //             company: true,
    //             product: true,
    //             category: true
    //         },
    //         where: {
    //             company: { id: id }
    //         }
    //     });
    // }

    companyPrize(id: number, query: PaginateQuery): Promise<Paginated<Prize>> {
        return paginate(query, this.prizeRepository.createQueryBuilder('prize').leftJoinAndSelect('prize.company', 'company').where('company.id = :id', { id }), {
            sortableColumns: ['id', 'title_uz', 'title_en', 'title_ru', 'count', 'type', 'image', 'raffle_date', 'company', 'status', 'created_date'],
            searchableColumns: ['id', 'title_uz', 'title_en', 'title_ru', 'count', 'type', 'image', 'raffle_date', 'company', 'status', 'created_date'],
            defaultSortBy: [
                ['id', 'DESC']
            ],
            filterableColumns: {
                id: [FilterOperator.GTE, FilterOperator.LTE],
            },
        });
    }
    // companyPrize(id: number) {
    //     return this.prizeRepository.find({
    //         relations : {
    //             company: true
    //         },
    //         where: {
    //             company: { id: id }
    //         }
    //     });
    // }

    companyBrands(id: number) {
        return this.brandRepository.find({
            relations: {
                company: true
            },
            where: {
                company: { id: id }
            }
        });
    }

    async companyBrandSticker(company_id: number, brand_id: number,query: PaginateQuery): Promise<Paginated<Release>>{

        return paginate(query, this.releaseRepository.createQueryBuilder('release')
                .innerJoin('release.company', 'company')
                .innerJoin('release.brand', 'brand')
                .innerJoin('release.product', 'product')
                .innerJoin('release.category', 'category')
                .select(['release.id','release.from_id','release.to_id','release.type','release.chance','category.title_ru','product.title','release.created_at','release.count','release.sticker_active_count'])
                .where('company.id = :company_id', { company_id }) 
                .andWhere('brand.id = :brand_id', { brand_id }), 
                {
                relations:['company','brand','product','category'],
                sortableColumns: ['id','from_id','to_id', 'status','chance','type','sticker_active_count','category.title_ru','product.title','count'],
                searchableColumns: ['id','from_id','to_id', 'status','chance','type','sticker_active_count','category.title_ru','product.title','count'],
                defaultSortBy: [
                    ['id', 'DESC']
                ],
                filterableColumns: {
                    id: [FilterOperator.IN, FilterOperator.LTE],
                },
        });
        
        // return this.releaseRepository.find({
        //     relations: {
        //         company: true,
        //         brand: true,
        //         product: true,
        //         category: true,
        //     },
        //     where: {
        //         company: { id: company_id },
        //         brand: { id: brand_id }
        //     }
        // })

        
    }

    async createCompany(newCompany: CreateCompanyInfoDto) {
        let is_save = true;
        const company = new Company();

        const region = await this.regionRepository.findOne({
            select: ['id', 'title_uz', 'title_ru', 'title_en', 'level', 'priority', 'status'],
            where: {
                id: newCompany.region_id
            }
        });

        company.full_name = newCompany.full_name;
        company.username = newCompany.username;
        company.position = newCompany.position;
        company.status = 1;
        company.region = region;
        company.password_hash = newCompany.password_hash;
        company.auth_key = newCompany.auth_key;
        let a = await this.companyRepository.save(company)


        if (!a) {
            is_save = false;
        }

        const info = new CompanyInfo();

        info.company = company;
        info.legal_name = newCompany.legal_name;
        info.phone = newCompany.phone;
        info.address = newCompany.address;
        info.payment_account = newCompany.payment_account;
        info.bank = newCompany.bank;
        info.mfo = newCompany.mfo;
        info.inn = newCompany.inn;
        info.oked = newCompany.oked;
        info.leader = newCompany.leader;
        info.responsible_person = newCompany.responsible_person;
        let b = await this.companyInfoRepository.save(info);
        if (!b) {
            is_save = false;
        }

        return is_save;

    }


    async update(id: number, updateComapnyDto: UpdateCompanyDto): Promise<Company> {

        const company = await this.findOne(id);

        const region = await this.regionRepository.findOne({
            select: ['id', 'title_uz', 'title_ru', 'title_en', 'level', 'priority', 'status'],
            where: {
                id: updateComapnyDto.region_id
            }
        });


        if (company && region) {
            company.full_name = updateComapnyDto.full_name;
            company.username = updateComapnyDto.username;
            company.position = updateComapnyDto.position;
            company.status = 1;
            company.region = region;

            if (updateComapnyDto.password_hash && updateComapnyDto.auth_key) {

                company.password_hash = updateComapnyDto.password_hash;
                company.auth_key = updateComapnyDto.auth_key;
            }

            return this.companyRepository.save(company);
        } else {
            return null;
        }
    }

    async updateInfo(id: number, updateComapnyDto: CompanyInfoDto) {
        const company = await this.findOne(id);

        let info = await this.companyInfoRepository.findOne({
            select: ['id', 'legal_name', 'phone', 'address', 'payment_account', 'bank', 'mfo', 'inn', 'oked', 'leader', 'responsible_person',],
            where: {
                company: { id: id }
            }
        });

        if (!info) {
            info = new CompanyInfo();
            info.company = company;
        }

        info.legal_name = updateComapnyDto.legal_name;
        info.phone = updateComapnyDto.phone;
        info.address = updateComapnyDto.address;
        info.payment_account = updateComapnyDto.payment_account;
        info.bank = updateComapnyDto.bank;
        info.mfo = updateComapnyDto.mfo;
        info.inn = updateComapnyDto.inn;
        info.oked = updateComapnyDto.oked;
        info.leader = updateComapnyDto.leader;
        info.responsible_person = updateComapnyDto.responsible_person;

        return this.companyInfoRepository.save(info);

    }


    findAll(query: PaginateQuery): Promise<Paginated<Company>> {
        return paginate(query, this.companyRepository, {
            sortableColumns: ['id', 'full_name', 'username', 'sticker_count', 'status', 'position', 'brand_count', 'sticker_count', 'cupon_active_count', 'cupon_active_count', 'cupon_count'],
            searchableColumns: ['full_name', 'username', 'sticker_count', 'status', 'position', 'brand_count', 'sticker_count', 'cupon_active_count', 'cupon_active_count', 'cupon_count'],
            defaultSortBy: [
                ['id', 'DESC']
            ],
            filterableColumns: {
                username: [FilterOperator.GTE, FilterOperator.LTE],
            },
        });
    }

    brandCount() {
        const brandCount = this.brandRepository.count();
        return brandCount
    }

    async delete(id: number) {
        return await this.connection.query(`DELETE FROM company WHERE id=${id}`);
    }
}