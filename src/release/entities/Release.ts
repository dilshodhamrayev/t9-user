import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Brand } from "../../brand/entities/Brand";
import { Category } from "../../category/entities/Category";
import { Company } from "../../company/entities/Company";
import { Product } from "../../product/entities/Product";
import { Sticker } from "../../sticker/entities/Sticker";

@Entity()
export class Release {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 50 })
    from_id: string;

    @Column({ type: "varchar", length: 50 })
    to_id: string;

    @Column({ type: "int" })
    count: number;

    @Column({ type: "int" })
    chance: number;

    @Column({ type: "datetime" })
    created_at: string;

    @Column({ type: "date", nullable: true })
    expire_date: string;

    @Column({ type: "int" })
    status: number;

    @Column({ type: "int" })
    type: number;

    @Column({ type: "decimal", precision: 15, scale: 2, nullable: true })
    amount_paid: number;

    @Column({ type: "decimal", precision: 15, scale: 2, nullable: true })
    sticker_price: number;

    @Column({ type: "decimal", precision: 15, scale: 2, nullable: true })
    product_price: number;

    @Column({ type: "int", nullable: true, default : 0 })
    sticker_active_count: string;

    @OneToMany(() => Sticker, sticker => sticker.release)
    stickers: Sticker[];

    @ManyToOne(() => Company, company => company.releases, { nullable: true, onDelete: "SET NULL", onUpdate: "CASCADE" })
    @JoinColumn({ name: "company_id", referencedColumnName: 'id' })
    company: Company;

    @ManyToOne(() => Brand, brand => brand.releases, { nullable: true, onDelete: "SET NULL", onUpdate: "CASCADE" })
    @JoinColumn({ name: "brand_id", referencedColumnName: 'id' })
    brand: Brand;

    @ManyToOne(() => Category, category => category.releases, { nullable: true, onDelete: "SET NULL", onUpdate: "CASCADE" })
    @JoinColumn({ name: "category_id", referencedColumnName: 'id' })
    category: Category;

    @ManyToOne(() => Product, product => product.releases, { nullable: true, onDelete: "SET NULL", onUpdate: "CASCADE" })
    @JoinColumn({ name: "product_id", referencedColumnName: 'id' })
    product: Product;
}