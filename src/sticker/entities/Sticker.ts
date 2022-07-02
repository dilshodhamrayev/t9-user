import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "../../category/entities/Category";
import { Company } from "../../company/entities/Company";
import { Prize } from "../../prize/entities/Prize";
import { Product } from "../../product/entities/Product";
import { Brand } from "../../brand/entities/Brand";
import { User } from "../../user/entities/User";
import { Release } from "../../release/entities/Release";

@Entity()
export class Sticker {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "enum", enum: [1, 2] })
    type: 1 | 2;

    @Column({ type: "varchar", length: 20, unique: true })
    code: string;

    @Column({ type: "varchar", length: 20, unique: true })
    generated_id: string;

    @Column({ type: "int" })
    year: number;

    @Column({ type: "int" })
    chance: number;

    @Column({ type: "date", nullable: true })
    expire_date: string;

    @Column({ type: "datetime", nullable: true })
    registered_date: string;

    @Column({ type: "datetime", nullable: true })
    win_date: string;

    @Column({ type: "int" })
    status: number;

    @Column({ type: "decimal", precision: 15, scale: 2, nullable: true })
    sticker_price: number;

    @Column({ type: "decimal", precision: 15, scale: 2, nullable: true })
    product_price: number;

    @ManyToOne(() => User, user => user.stickers, { onDelete: "SET NULL", onUpdate: "CASCADE", nullable: true })
    @JoinColumn({ name: "user_id", referencedColumnName: "id" })
    user: User;

    @ManyToOne(() => Company, company => company.stickers, { onDelete: "SET NULL", onUpdate: "CASCADE", nullable: true })
    @JoinColumn({ name: "company_id", referencedColumnName: "id" })
    company: Company;

    @ManyToOne(() => Product, product => product.stickers, { onDelete: "SET NULL", onUpdate: "CASCADE", nullable: true })
    @JoinColumn({ name: "product_id", referencedColumnName: "id" })
    product: Product;

    @ManyToOne(() => Category, category => category.stickers, { onDelete: "SET NULL", onUpdate: "CASCADE", nullable: true })
    @JoinColumn({ name: "category_id", referencedColumnName: "id" })
    category: Category;

    @ManyToOne(() => Prize, prize => prize.stickers, { onDelete: "SET NULL", onUpdate: "CASCADE", nullable: true })
    @JoinColumn({ name: "prize_id", referencedColumnName: "id" })
    prize: Prize;

    @ManyToOne(() => Brand, brand => brand.stickers, { onDelete: "SET NULL", onUpdate: "CASCADE", nullable: true })
    @JoinColumn({ name: "brand_id", referencedColumnName: "id" })
    brand: Brand;

    @ManyToOne(() => Release, release => release.stickers, { onDelete: "CASCADE", onUpdate: "CASCADE", nullable: true })
    @JoinColumn({ name: "release_id", referencedColumnName: "id" })
    release: Release;
}