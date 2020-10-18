import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Purchase } from "./purchase.entity";

@Entity()
export class Client {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    enabled?: boolean;

    @Column()
    ip?: string;

    @Column()
    port?: number;

    @Column()
    token?: string;

    @Column('timestamp')
    firstVerifiedAt?: number;

    @Column('timestamp')
    lastVerifiedAt?: number;

    @ManyToOne(() => Purchase, purchase => purchase.clients)
    purchase: Purchase;
}