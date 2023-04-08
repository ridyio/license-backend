import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PurchaseEntity } from './purchase.entity';

@Entity()
export class ApplicationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    name: 'item_id',
  })
  envatoItemCode: number;

  @OneToMany(() => PurchaseEntity, (purchase) => purchase.application)
  purchases: PurchaseEntity[];
}
