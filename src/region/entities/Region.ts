import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "../../company/entities/Company";
import { CompanyRegionStatistics } from "../../company/entities/CompanyRegionStatistics";
import { User } from "../../user/entities/User";

@Entity()
export class Region {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 30 })
    title_uz: string;

    @Column({ type: "varchar", length: 30 })
    title_ru: string;

    @Column({ type: "varchar", length: 30, nullable: true })
    title_en?: string;
    
    @Column({ type: "varchar", length: 255})
    slug: string;

    @Column({ type: "int", nullable: true, default: 1 })
    level?: number;

    @Column({ type: "int", nullable: true, default: 0 })
    priority?: number;
    
    @Column({ type: "int", nullable: true, default: null })
    parent_id?: number;

    @Column({ type: "boolean", default: true, nullable: true })
    status: boolean;

    @Column({ type: "int", nullable: true, default: 0 })
    user_count?: number;

    @Column({ type: "int", nullable: true, default: 0 })
    sticker_count?: number; //bu foizda bo'lishi kerak, map da ko'rsatish uchun

    @Column({ type: "int", nullable: true, default: 0 })
    cupon_count?: number; //bu foizda bo'lishi kerak, map da ko'rsatish uchun

    @OneToMany(() => User, user => user.regionjon)
    users: User[]

    @OneToMany(() => User, user => user.regionchild)
    users2: User[]

    @OneToMany(() => Company, company => company.region)
    companies: Company[];
    
    @OneToMany(() => CompanyRegionStatistics, companyRegionStatistics => companyRegionStatistics.region)
    companyRegionStatistics: CompanyRegionStatistics;
}