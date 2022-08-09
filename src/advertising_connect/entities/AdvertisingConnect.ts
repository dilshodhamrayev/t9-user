import { Advertising } from "../../advertising/entities/Advertising";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "../../company/entities/Company";

@Entity()
export class AdvertisingConnect {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Advertising, advertising => advertising.advertising_connect, { nullable: true, onDelete: "CASCADE", onUpdate: "CASCADE" })
    @JoinColumn({ name: "advertising_id", referencedColumnName: 'id' })
    advertising: Advertising;

    @ManyToOne(() => Company, company => company.advertising_connect, { nullable: true, onDelete: "CASCADE", onUpdate: "CASCADE" })
    @JoinColumn({ name: "company_id", referencedColumnName: 'id' })
    company: Company;

    @Column({ type: "float", default: 0 })
    price: number;

    @Column({ type: "date", nullable: true})
    begin_date: string;
    
    @Column({ type: "date", nullable: true})
    end_date: string;

    @Column({ type: "int", default: 0 })
    place: number;
    
    @Column({ type: "enum", enum: [1, 2] })
    type: 1 | 2;

    @Column({ type: "varchar", length: 255, nullable: true })
    fayl?: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    poster?: string;

    @Column({ type: "varchar", length: 255 })
    title: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    link?: string;

    @Column({ type: "int", default: 0 })
    status: number;

    @Column({ type: "int", default: 0 })
    views?: number;

    @Column({ type: "int", default: 0 })
    likes?: number;

    @Column({ type: "date", nullable: true})
    created_at: string;

    

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

    

    // @Column({ type: "int", nullable: true, default: 1 })
    // level?: number;

    // @Column({ type: "int", nullable: true, default: 0 })
    // priority?: number;

    // @Column({ type: "boolean", default: true, nullable: true })
    // status: boolean;

    
}