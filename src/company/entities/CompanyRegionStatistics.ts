import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Region } from "../../region/entities/Region";
import { Brand } from "../../brand/entities/Brand";
import { Company } from "./Company";

@Entity()
export class CompanyRegionStatistics {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "int", default: 0 })
    registered_stickers: number; // foizda yozish kerak

    @Column({ type: "int", default: 0 })
    registered_cupon: number; // foizda yozish kerak
    
    @Column({ type: "int", nullable: true, default: 0 })
    user_count?: number;

    @Column({ type: "date" })
    created_at: number;

    @ManyToOne(() => Company, company => company.companyRegionStatistics, { onUpdate: "CASCADE", onDelete: "CASCADE", nullable: false })
    @JoinColumn({ name: "company_id", referencedColumnName: "id" })
    company: Company;

    @ManyToOne(() => Brand, brand => brand.companyRegionStatistics, { onUpdate: "CASCADE", onDelete: "CASCADE", nullable: false })
    @JoinColumn({ name: "brand_id", referencedColumnName: "id" })
    brand: Brand;

    @ManyToOne(() => Region, region => region.companyRegionStatistics, { onUpdate: "CASCADE", onDelete: "CASCADE", nullable: false })
    @JoinColumn({ name: "region_id", referencedColumnName: "id" })
    region: Region;
}