import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Application } from "./application.entity";
import { Client } from "./client.entity";

@Entity()
export class Purchase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    purchaseCode?: string;

    @Column()
    buyerUserName?: string;

    @Column()
    vip?: boolean;

    @Column()
    enabled?: boolean;

    @Column()
    details?: string;

    @Column()
    email?: string;

    @Column('tinyint')
    licenseCount?: number;

    @Column('timestamp')
    purchasedAt?: string;

    @Column('float')
    amountPaid?: number;

    @ManyToOne(() => Application, application => application.purchases)
    application: Application;

    @OneToMany(() => Client, client => client.purchase)
    clients: Client[];
}