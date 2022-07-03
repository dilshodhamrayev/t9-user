import { Company } from "../../company/entities/Company";
import { Product } from "../../product/entities/Product";
import { Sticker } from "../../sticker/entities/Sticker";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Release } from "../../release/entities/Release";
import { CompanyRegionStatistics } from "../../company/entities/CompanyRegionStatistics";

@Entity()
export class Brand {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 100 })
    name: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    image: string;

    @Column({ type: "int", default: 0 })
    product_count: number;

    @Column({ type: "int", default: 0 })
    sticker_count: number;

    @Column({ type: "int", default: 0 })
    active: number;

    @Column({ type: "int", default: 0 })
    waiting: number;

    @ManyToOne(() => Company, company => company.brands, { nullable: false, onDelete: "CASCADE", onUpdate: "CASCADE" })
    @JoinColumn({ name: "company_id", referencedColumnName: 'id' })
    company: Company;

    @OneToMany(() => Release, release => release.brand)
    releases: Release[];

    @OneToMany(() => Product, product => product.brand)
    products: Product[];

    @OneToMany(() => Sticker, sticker => sticker.prize)
    stickers: Sticker[];

    @OneToMany(() => CompanyRegionStatistics, companyRegionStatistics => companyRegionStatistics.brand)
    companyRegionStatistics: CompanyRegionStatistics;
}