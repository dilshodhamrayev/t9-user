import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Company } from "../../company/entities/Company";
import { Category } from "../../category/entities/Category";
import { Brand } from "../../brand/entities/Brand";
import { DeleteResult, Repository } from "typeorm";
import { ProductDto } from "../dto/product.dto";
import { Product } from "../entities/Product";
import { FilterOperator, paginate, Paginated, PaginateQuery } from "nestjs-paginate";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product) private productRepository: Repository<Product>,
        @InjectRepository(Company) private companyRepository: Repository<Company>,
        @InjectRepository(Category) private categoryRepository: Repository<Category>,
        @InjectRepository(Brand) private brandRepository: Repository<Brand>
    ) { }

    findAll(query: PaginateQuery): Promise<Paginated<Product>> {
        return paginate(
            query,
            this.productRepository.createQueryBuilder('product')
            .leftJoinAndSelect('product.company', 'company')
            .leftJoinAndSelect('product.category', 'category')
            .leftJoinAndSelect('product.brand', 'brand')
            .select(['product.id','product.title','category.title_ru','brand.name','company.full_name','product.sticker_count','product.sticker_active_count']),
            {
                relations:['company','category','brand'],
                sortableColumns: ['id', 'title','sticker_count','sticker_active_count','category.title_ru','brand.name','company.full_name'],
                searchableColumns: ['id', 'title','sticker_count','sticker_active_count','category.title_ru','brand.name','company.full_name'],
                defaultSortBy: [
                    ['id', 'DESC']
                ],
                filterableColumns: {
                    title: [FilterOperator.GTE, FilterOperator.LTE],
                },
            }
        );
    }

    findOne(id: number): Promise<Product> {
        return this.productRepository.findOne({
            select: ['id', 'title', 'image', 'sticker_count', 'sticker_active_count'],
            relations: {
                company: true,
                category: true,
                brand: true,
                stickers: true
            },
            where: {
                id
            }
        });
    }

    async findByCompanyAndCategory(company_id: number, category_id: number): Promise<Product[]> {
        let company = await this.companyRepository.findOne({
            where: {
                id: company_id
            }
        });

        if (!company) throw new NotFoundException("Company not found");

        let category = await this.categoryRepository.findOne({
            where: {
                id: category_id
            }
        });

        if (!category) throw new NotFoundException("Category not found");

        return this
            .productRepository
            .find({
                where: {
                    category,
                    company
                }
            });
    }

    async createProduct(product: ProductDto): Promise<Product> {

        const company_id = Number(product.company_id);
        const category_id = Number(product.category_id);
        const brand_id = Number(product.brand_id);

        const company = await this.companyRepository.findOne({
            select: ['id', 'username', 'password_hash', 'status', 'full_name', 'auth_key', 'created_at', 'region'],
            where: {
                id: company_id
            }
        });

        const category = await this.categoryRepository.findOne({
            select: ['id', 'title_uz', 'title_ru', 'title_en', 'image', 'level', 'priority', 'status', 'parent'],
            where: {
                id: category_id
            }
        });

        const brand = await this.brandRepository.findOne({
            select: ['id', 'name', 'image', 'company'],
            where: {
                id: brand_id
            }
        });

        if (company) {
            const product_ = new Product();
            product_.title = product.title;
            product_.company = company;
            product_.brand = brand;
            product_.category = category;
            product_.image = product.image;
            return this.productRepository.save(product_);
        } else {
            return null;
        }

    }

    async updateProduct(product: ProductDto, id: number): Promise<Product> {

        const company_id = Number(product.company_id);
        const category_id = Number(product.category_id);
        const brand_id = Number(product.brand_id);

        const product_ = await this.findOne(id);

        const company = await this.companyRepository.findOne({
            select: ['id', 'username', 'password_hash', 'status', 'full_name', 'auth_key', 'created_at', 'region'],
            where: {
                id: company_id
            }
        });

        const category = await this.categoryRepository.findOne({
            select: ['id', 'title_uz', 'title_ru', 'title_en', 'image', 'level', 'priority', 'status', 'parent'],
            where: {
                id: category_id
            }
        });

        const brand = await this.brandRepository.findOne({
            select: ['id', 'name', 'image', 'company'],
            where: {
                id: brand_id
            }
        });

        if (company && brand && category && product_) {

            product_.title = product.title;
            product_.company = company;
            product_.brand = brand;
            product_.category = category;
            if (product.image) {
                product_.image = product.image;
            }
            return this.productRepository.save(product_);
        } else {
            return null;
        }
    }
    async delete(id: number): Promise<DeleteResult> {
        try {
            return await this.productRepository.delete(id);
        } catch (error) {
            throw new HttpException('Error deleting product', HttpStatus.BAD_REQUEST);
        }
    }
    getCount() {
        let query = this.productRepository.createQueryBuilder('product')
            .select("SUM(product.sticker_count)", 'sticker_count')
            .addSelect("SUM(product.brand_count)", 'brand_count')
            .addSelect("SUM(product.company_count)", 'company_count');
        // console.log(query.getQueryAndParameters());
        return query.getRawOne();
    }
}