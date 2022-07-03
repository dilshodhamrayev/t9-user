import { Brand } from "../../brand/entities/Brand";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "../../category/entities/Category";
import { Company } from "../../company/entities/Company";
import { CompanyProductStatistics } from "../../company/entities/CompanyProductStatistics";
import { Sticker } from "../../sticker/entities/Sticker";
import { Release } from "../../release/entities/Release";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 100 })
    title: string;

    @Column({ type: "int",default: 0 })
    sticker_count: number;
   
    @Column({ type: "int",default: 0 })
    sticker_active_count: number;

    @Column({ type: "int", default: 0 })
    prize_count: number;
    
    @Column({ type: "int", default: 0 })
    company_count: number;
    
    @Column({ type: "int", default: 0 })
    brand_count: number;

    @Column({ type: "varchar", length: 255, nullable: true })
    image: string;

    @ManyToOne(() => Company, company => company.products, { nullable: false, onDelete: "CASCADE", onUpdate: "CASCADE" })
    @JoinColumn({ name: "company_id", referencedColumnName: 'id' })
    company: Company;

    @ManyToOne(() => Brand, brand => brand.products, { nullable: false, onDelete: "CASCADE", onUpdate: "CASCADE" })
    @JoinColumn({ name: "brand_id", referencedColumnName: 'id' })
    brand: Brand;

    @ManyToOne(() => Category, category => category.products, { nullable: false, onDelete: "CASCADE", onUpdate: "CASCADE" })
    @JoinColumn({ name: "category_id", referencedColumnName: 'id' })
    category: Category;

    @OneToMany(() => Release, release => release.product)
    releases: Release[];

    @OneToMany(() => Sticker, sticker => sticker.product)
    stickers: Sticker[];

    @OneToMany(() => CompanyProductStatistics, companyProductStatistics => companyProductStatistics.product)
    companyProductStatistics: CompanyProductStatistics;
}