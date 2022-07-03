import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectConnection, InjectRepository } from "@nestjs/typeorm";
import { Connection } from "mysql2";
import { FilterOperator, paginate, Paginated, PaginateQuery } from "nestjs-paginate";
import { Repository } from "typeorm";
import { Brand } from "../../brand/entities/Brand";
import { Product } from "../../product/entities/Product";
import { CategoryDto } from "../dto/category.dto";
import { Category } from "../entities/Category";

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category) private categoryRepository: Repository<Category>,
        @InjectRepository(Product) private productRepository: Repository<Product>,
        @InjectRepository(Brand) private brandRepository: Repository<Brand>,
        @InjectConnection() private readonly connection: Connection
    ) { }

    findAll(query: PaginateQuery): Promise<Paginated<Category>> {
        return paginate(query, this.categoryRepository, {
            sortableColumns: ['id', 'title_uz', 'title_ru', 'sticker_count', 'company_count', 'title_en'],
            searchableColumns: ['id', 'title_uz', 'title_ru', 'sticker_count', 'company_count', 'title_en'],
            defaultSortBy: [
                ['id', 'DESC']
            ],
            filterableColumns: {
                title_ru: [FilterOperator.GTE, FilterOperator.LTE],
            },
        });
    }


    findAllList(): Promise<Category[]> {
        return this.categoryRepository.find({});
    }

    async findByBrand(brand_id: number): Promise<Category[]> {
        let brand = await this.brandRepository.findOne({
            where: {
                id: brand_id
            }
        });

        if (!brand) throw new NotFoundException("Brand not found");

        return this
            .categoryRepository
            .createQueryBuilder("category")
            .innerJoin('category.products', "product")
            .innerJoin('product.brand', "brand")
            .select("category.*")
            .where('brand.id = :brand_id', { brand_id })
            .getRawMany();
    }

    findAllParent() {
        return this.connection.query(`SELECT * FROM category WHERE parent_id is null`);
    }

    // async findOneCategory(id: number) {
    //     return {
    //         category: await this.connection.query(`SELECT * FROM category WHERE ID=${id}`),
    //         products: await this.connection.query(`SELECT product.title, brand.name, product.sticker_count, product.sticker_active_count FROM product inner join brand on product.brand_id=brand.id WHERE category_id=${id}`),
    //     }
    // }

    async findOneCategory(id: number, query: PaginateQuery): Promise<Paginated<Product>> {
        const data = await paginate(
            query,
            this.productRepository
                .createQueryBuilder('product')
                .select(['product.id', 'brand.name', 'product.title', 'product.sticker_count', 'product.sticker_active_count'])
                .innerJoin('product.brand', 'brand')
                .where('product.category_id = :id', { id }),
            {
                sortableColumns: ['id', 'brand.name', 'title', 'sticker_count', 'sticker_active_count'],
                searchableColumns: ['id', 'brand.name', 'title', 'sticker_count', 'sticker_active_count'],
                defaultSortBy: [
                    ['id', 'DESC']
                ],
                filterableColumns: {
                    title: [FilterOperator.GTE, FilterOperator.LTE],
                },
                relations: ["brand"]
            });
        return data;

    }


    findOne(id: number) {
        return this.categoryRepository.findOne({
            select: ['id', 'title_uz', 'title_ru', 'title_en', 'image', 'level', 'priority', 'status', 'parent', 'product_count', 'active_sticker_count', 'company_count', 'sticker_count', 'brand_count'],
            where: {
                id
            },
            relations: {
                parent: true
            }
        });
    }

    async delete(id: number) {
        return await this.connection.query(`DELETE FROM category WHERE id=${id}`);
    }

    async createCategory(category: CategoryDto): Promise<Category> {
        let parent = null
        if (category.parent_id) {
            parent = await this.findOne(category.parent_id)
        }

        const cat_ = new Category();

        cat_.title_uz = category.title_uz;
        cat_.title_ru = category.title_ru;
        cat_.title_en = category.title_en;
        cat_.status = category.status;
        cat_.priority = category.priority;
        cat_.level = category.level;
        cat_.parent = parent;

        if (category.image) {
            cat_.image = category.image;
        }
        return this.categoryRepository.save(cat_);

    }

    async updateCategory(categoryUpdated: CategoryDto, id: number): Promise<Category> {

        const cat_ = await this.findOne(id);

        let parent = null
        if (categoryUpdated.parent_id) {
            parent = await this.findOne(categoryUpdated.parent_id)
        }

        if (cat_) {
            cat_.title_uz = categoryUpdated.title_uz;
            cat_.title_ru = categoryUpdated.title_ru;
            cat_.title_en = categoryUpdated.title_en;
            cat_.status = categoryUpdated.status;
            cat_.priority = categoryUpdated.priority;
            cat_.level = categoryUpdated.level;

            cat_.parent = parent;

            if (categoryUpdated.image) {
                cat_.image = categoryUpdated.image;
            }
            return this.categoryRepository.save(cat_);
        } else {
            return null;
        }
    }
}