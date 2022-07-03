import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Prize } from "../../prize/entities/Prize";
import { Product } from "../../product/entities/Product";
import { Region } from "../../region/entities/Region";
import { Sticker } from "../../sticker/entities/Sticker";
import { Brand } from "../../brand/entities/Brand";
import { CompanyProductStatistics } from "./CompanyProductStatistics";
import { CompanyRegionStatistics } from "./CompanyRegionStatistics";
import { CompanyInfo } from "./CompanyInfo";
import { Release } from "../../release/entities/Release";

@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 100 })
    username: string;

    @Column({ type: "varchar", length: 255 })
    password_hash: string;

    @Column({ type: "int", default: 1 })
    status: number;

    @Column({ type: "varchar", length: 255 })
    full_name: string;

    @Column({ type: "varchar", length: 255 })
    position: string;

    @Column({ type: "varchar", length: 255, unique: true })
    auth_key: string;
    
    @Column({ type: "int", default:0})
    brand_count: number;
   
    @Column({ type: "int", default:0})
    sticker_count: number;

    @Column({ type: "int",default:0})
    sticker_active_count: number;

    @Column({ type: "int", default:0})
    cupon_count: number;

    @Column({ type: "int",default:0})
    cupon_active_count: number;

    @Column({ type: "datetime" })
    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => Region, region => region.companies, { nullable: false, onDelete: "RESTRICT", onUpdate: "CASCADE" })
    @JoinColumn({ name: "region_id", referencedColumnName: "id" })
    region: Region;

    @OneToMany(() => Product, product => product.company)
    products: Product[];

    @OneToMany(() => Sticker, sticker => sticker.company)
    stickers: Sticker[];

    @OneToMany(() => Release, release => release.company)
    releases: Release[];

    @OneToMany(() => Prize, prize => prize.company)
    prizes: Prize[];

    @OneToMany(() => Brand, brand => brand.company)
    brands: Brand[];

    @OneToMany(() => CompanyProductStatistics, companyProductStatistics => companyProductStatistics.company)
    companyProductStatistics: CompanyProductStatistics;

    @OneToMany(() => CompanyRegionStatistics, companyRegionStatistics => companyRegionStatistics.company)
    companyRegionStatistics: CompanyRegionStatistics;

    @OneToOne(() => CompanyInfo, info => info.company)
    info: CompanyInfo;
}