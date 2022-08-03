import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Settings {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 255 })
    phone: string;

    @Column({ type: "varchar", length: 255 })
    email: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    telegram: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    instagram: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    facebook: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    youtube: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    tiktok: string;

    @Column({ type: "longtext" })
    about_us: string;

    @Column({ type: "longtext" })
    about_cupon: string;

    @Column({ type: "longtext" })
    about_sticker: string;

    
}