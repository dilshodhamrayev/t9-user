import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "../../company/entities/Company";
import { Sticker } from "../../sticker/entities/Sticker";
import { PrizeStatuses } from "../types";

@Entity()
export class Prize {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 30 })
    title_uz: string;

    @Column({ type: "varchar", length: 30 })
    title_ru: string;

    @Column({ type: "varchar", length: 30, nullable: true })
    title_en?: string;

    @Column({ type: "int" })
    count: number;

    @Column({ type: "int", default: PrizeStatuses.WAITING_WINNER, nullable: true })
    status: PrizeStatuses;

    @Column({ type: "enum", enum: [1, 2, 3] })
    type: 1 | 2 | 3;

    @Column({ type: "varchar", nullable: true, length: 255 })
    image: string;

    @Column({ type: "datetime" })
    raffle_date: string;

    @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
    created_date: string;

    @ManyToOne(() => Company, company => company.prizes, { nullable: true, onDelete: "CASCADE", onUpdate: "CASCADE" })
    @JoinColumn({ name: "company_id", referencedColumnName: 'id' })
    company: Company;

    @OneToMany(() => Sticker, sticker => sticker.prize)
    stickers: Sticker[];
}
