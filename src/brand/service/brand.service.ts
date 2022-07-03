import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectConnection, InjectRepository } from "@nestjs/typeorm";
import { Company } from "../../company/entities/Company";
import { Repository } from "typeorm";
import { Brand } from "../entities/Brand";
import { BrandDto } from "../dto/brand.dto";
import { Connection } from "mysql2";
import { FilterOperator, paginate, Paginated, PaginateQuery } from "nestjs-paginate";

@Injectable()
export class BrandService {
    constructor(
        @InjectRepository(Brand) private brandRepository: Repository<Brand>,
        @InjectRepository(Company) private companyRepository: Repository<Company>,
        @InjectConnection() private readonly connection: Connection
    ) { }

    async cronService(){
        let all = await this.brandRepository.find({})
        
        all.forEach(async element => {
            
            let productCount = await this.connection.query(`SELECT count(brand_id) FROM product WHERE brand_id=${element.id}`)
            let stickerCount = await this.connection.query(`SELECT count(brand_id) FROM sticker WHERE brand_id=${element.id}`)

            console.log('productCount:')
            console.log(productCount)
            console.log(productCount[0]['count(brand_id)'])
            // console.log('stickerCount:')
            // console.log(stickerCount)
            
        });
    }

    findAll(query: PaginateQuery): Promise<Paginated<Brand>> {
        return paginate(query, this.brandRepository.createQueryBuilder('brand')
            .leftJoin('brand.company', 'company')
            .select(['brand.id', 'brand.name', 'brand.product_count', 'brand.image', 'brand.sticker_count', 'brand.active', 'brand.waiting','company.full_name']), {
            relations:['company'],
            sortableColumns: ['id', 'name', 'company.full_name'],
            searchableColumns: ['id', 'name', 'company.full_name'],
            defaultSortBy: [
                ['id', 'DESC']
            ],
            filterableColumns: {
                id: [FilterOperator.IN],
            },
        });
    }

    findAllList(): Promise<Brand[]> {
        return this.brandRepository.find({});
    }

    async findByCompany(company_id: number): Promise<Brand[]> {
        console.log(company_id);

        let company = await this.companyRepository.findOne({
            where: {
                id: company_id
            }
        });

        if (!company) throw new NotFoundException("Company not found");
        return this.brandRepository.find({
            where: { company }
        });
    }

    async findOne(id: number): Promise<Brand> {
        return this.brandRepository.findOne({
            select: ['id', 'name', 'image', 'waiting', 'active', "sticker_count", "product_count"],
            relations: {
                company: true
            },
            where: {
                id
            }
        });
    }

    async delete(id: number) {
        return await this.connection.query(`DELETE FROM brand WHERE id=${id}`);
    }

    async createBrand(brand: BrandDto): Promise<Brand> {
        const company_id = Number(brand.company_id);
        const company = await this.companyRepository.findOne({
            select: ['id', 'username', 'password_hash', 'status', 'full_name', 'auth_key', 'created_at', 'region'],
            where: {
                id: company_id
            }
        });
        if (company) {
            const br = new Brand();
            br.name = brand.name;
            br.company = company;
            br.image = brand.image;
            return this.brandRepository.save(br);
        } else {
            return null;
        }
    }

    async updateBrand(brand: BrandDto, id: number): Promise<Brand> {
        const company_id = Number(brand.company_id);
        const company = await this.companyRepository.findOne({
            select: ['id', 'username', 'password_hash', 'status', 'full_name', 'auth_key', 'created_at', 'region'],
            where: {
                id: company_id
            }
        });

        const brand_ = await this.findOne(id);

        if (company && brand_) {
            brand_.name = brand.name;
            brand_.company = company;
            if (brand.image) {
                brand_.image = brand.image;
            }
            return this.brandRepository.save(brand_);
        } else {
            return null;
        }
    }
}