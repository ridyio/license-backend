import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Purchase } from "./purchase.entity";

@Entity()
export class Client {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        default: true
    })
    enabled: boolean;

    @Column()
    ip: string;

    @Column({
        type: 'int',
        default: 8080
    })
    port: number;

    @Column()
    token: string;

    @CreateDateColumn({
        type: 'timestamp'
    })
    firstVerifiedAt: number;

    @UpdateDateColumn({
        type: 'timestamp'
    })
    lastVerifiedAt?: number;

    @ManyToOne(() => Purchase, purchase => purchase.clients)
    purchase: Purchase;
}