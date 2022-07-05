import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Region } from "../../region/entities/Region";
import { Sticker } from "../../sticker/entities/Sticker";

@Entity()
export class User {
    
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ type: "varchar", length: 100, unique: true })
    username: string;

    @Column({ type: "varchar", length: 255 })
    password_hash: string;

    @Column({ type: "int", default: 1 })
    status: number;
    
    @Column({ type: "varchar", length: 255, nullable: true, })
    sex: number;

    @Column({ type: "varchar", length: 255 })
    fname: string;

    @Column({ type: "varchar", length: 255 })
    lname: string;

    @Column({ type: "date" })
    birthday: Date;

    @Column({ type: "varchar", length: 20, unique: true })
    generated_id: string;

    @Column({ type: "varchar", length: 255, unique: true })
    auth_key: string;

    @Column({ type: "varchar", length: 10, nullable: true })
    confirm_code?: string;

    @Column({ type: "boolean", default: false })
    agreement_confirmed?: boolean;
    
    @Column({ type: "int",default: 0 })
    sticker_count: number;

    @Column({ type: "int",default: 0 })
    cupon_count: number;

    @Column({ type: "datetime", nullable: true, })
    @CreateDateColumn()
    created_at: Date;

    @Column({ type: "varchar", length: 255, nullable: true, })
    fatvo: string;
    
    @Column({ type: "varchar", length: 255, nullable: true, })
    fatvo2: string;
    
    @Column({ type: "varchar", length: 255, nullable: true, })
    prize: string;
    
    @Column({ type: "varchar", length: 255, nullable: true, })
    sticker_code: string;

    @Column({ type: "int", nullable: true, default: null })
    chat_id: number;
    
    @Column({ type: "int", nullable: true, default: null })
    sms_code: number;

    // @Column({ type: "varchar", length: 255, nullable: true, })
    // region_id: string;
    
    // @Column({ type: "varchar", length: 255, nullable: true, })
    // region_child_id: string;

    @ManyToOne(() => Region, regionjon => regionjon.users, { nullable: false, onDelete: "RESTRICT", onUpdate: "CASCADE" })
    @JoinColumn({ name: "region_id", referencedColumnName: "id" })
    regionjon: Region;

    @ManyToOne(() => Region, regionchild => regionchild.users2, { nullable: false, onDelete: "RESTRICT", onUpdate: "CASCADE" })
    @JoinColumn({ name: "region_child_id", referencedColumnName: "id" })
    regionchild: Region;

    @OneToMany(() => Sticker, sticker => sticker.user)
    stickers: Sticker[]
}