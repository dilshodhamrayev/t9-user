import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../../product/entities/Product";
import { Company } from "./Company";

@Entity()
export class CompanyProductStatistics {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "int" })
    registered_stickers: number;

    @Column({ type: "date" })
    created_at: number;

    @ManyToOne(() => Company, company => company.companyProductStatistics, { onUpdate: "CASCADE", onDelete: "CASCADE", nullable: false })
    @JoinColumn({ name: "company_id", referencedColumnName: "id" })
    company: Company;

    @ManyToOne(() => Product, product => product.companyProductStatistics, { onUpdate: "CASCADE", onDelete: "CASCADE", nullable: false })
    @JoinColumn({ name: "product_id", referencedColumnName: "id" })
    product: Product;
}