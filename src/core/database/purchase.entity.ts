import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Application } from "./application.entity";
import { Client } from "./client.entity";

@Entity()
export class Purchase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
    })
    purchaseCode: string;

    @Column({
        nullable: true
    })
    buyerUserName?: string;

    @Column({
        default: false
    })
    vip: boolean;

    @Column({
        default: true
    })
    enabled: boolean;

    @Column({
        nullable: true
    })
    details?: string;

    @Column({
        nullable: true
    })
    email?: string;

    @Column('tinyint', {
        default: 1
    })
    licenseCount: number;

    @CreateDateColumn({
        type: 'timestamp'
    })
    purchasedAt?: string;

    @Column('float', { 
        default: 0.0
    })
    amountPaid: number;

    @ManyToOne(() => Application, application => application.purchases)
    application: Application;

    @OneToMany(() => Client, client => client.purchase)
    clients: Client[];
}