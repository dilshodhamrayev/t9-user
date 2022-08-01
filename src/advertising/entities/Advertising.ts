import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Advertising {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "int", default: 0 })
    place: number;
    
    @Column({ type: "enum", enum: [1, 2] })
    type: 1 | 2;

    @Column({ type: "varchar", length: 250 })
    fayl: string;

    @Column({ type: "int", default: 0 })
    views?: number;

    @Column({ type: "int", default: 0 })
    likes?: number;

    @Column({ type: "date", nullable: true})
    created_at: string;

    @Column({ type: "date", nullable: true})
    begin_date: string;
    
    @Column({ type: "date", nullable: true})
    end_date: string;

    // @Column({ type: "varchar", length: 50 })
    // title_ru: string;

    // @Column({ type: "varchar", length: 50, nullable: true })
    // title_en?: string;

    // @Column({ type: "int", default: 0 })
    // product_count?: number;

    // @Column({ type: "int", default: 0 })
    // company_count?: number;

    // @Column({ type: "int", default: 0 })
    // sticker_count?: number;

    // @Column({ type: "int", default: 0 })
    // active_sticker_count?: number;

    // @Column({ type: "int", default: 0 })
    // brand_count?: number;

    // @Column({ type: "varchar", length: 255, nullable: true })
    // image?: string;

    // @Column({ type: "int", nullable: true, default: 1 })
    // level?: number;

    // @Column({ type: "int", nullable: true, default: 0 })
    // priority?: number;

    // @Column({ type: "boolean", default: true, nullable: true })
    // status: boolean;

    // @ManyToOne(() => Category, category => category.parents, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    // @JoinColumn({ name: "parent_id", referencedColumnName: "id" })
    // parent: Category[];

    // @OneToMany(() => Category, category => category.parent)
    // parents: Category[];

    // @OneToMany(() => Product, product => product.category)
    // products: Product[];

    // @OneToMany(() => Sticker, sticker => sticker.category)
    // stickers: Sticker[];

    // @OneToMany(() => Release, release => release.category)
    // releases: Release[];
}