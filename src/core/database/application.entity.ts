import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Purchase } from "./purchase.entity";

@Entity()
export class Application {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    envatoId: number; 

    @OneToMany(() => Purchase, purchase => purchase.application)
    purchases: Purchase[];
}