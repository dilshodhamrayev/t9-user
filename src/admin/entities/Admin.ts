import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { isEmpty, IsNotEmpty } from 'class-validator';
@Entity()
export class Admin extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 100, unique: true })
    username: string;

    @Column({ type: "varchar", length: 255 })
    password_hash: string;

    @Column({ type: "int", default: 1 })
    status: number;

    @Column({ type: "varchar", length: 255 })
    full_name: string;

    @Column({ type: "varchar", length: 255, unique: true })
    auth_key: string;

    @Column({ type: "datetime" })
    @CreateDateColumn()
    created_at: Date;
    @Column({
        default: 0,
      })
    tokenVersion: number;
}