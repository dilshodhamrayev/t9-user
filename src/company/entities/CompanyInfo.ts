import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "./Company";

@Entity()
export class CompanyInfo {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Company, company => company.info, { nullable: false, onDelete: "CASCADE", onUpdate: "CASCADE" })
    @JoinColumn({ name: "company_id", referencedColumnName: "id" })
    company: Company;

    @Column({ type: "varchar", length: 255 })
    legal_name: string;

    @Column({ type: "int", default: 1 })
    status: number;

    @Column({ type: "varchar", length: 255 })
    phone: string;

    @Column({ type: "varchar", length: 255 })
    address: string;
    
    @Column({ type: "varchar", length: 255 })
    payment_account: string;
    
    @Column({ type: "varchar", length: 255 })
    bank: string;
    
    @Column({ type: "varchar", length: 255 })
    mfo: string;
    
    @Column({ type: "varchar", length: 255 })
    inn: string;
    
    @Column({ type: "varchar", length: 255 })
    oked: string;
    
    @Column({ type: "varchar", length: 255 })
    leader: string;

    @Column({ type: "varchar", length: 255 })
    responsible_person: string;

    @Column({ type: "datetime" })
    @CreateDateColumn()
    created_at: Date;
}