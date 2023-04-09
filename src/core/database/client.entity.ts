import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PurchaseEntity } from './purchase.entity';

@Entity('client')
export class ClientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    default: true,
  })
  enabled: boolean;

  @Column()
  ip: string;

  @Column({
    type: 'int',
    default: 8080,
  })
  port: number;

  @Column()
  token: string;

  @CreateDateColumn({
    name: 'first_verified_at',
  })
  firstVerifiedAt: Date;

  @UpdateDateColumn({
    name: 'last_verified_at',
  })
  lastVerifiedAt?: Date;

  @ManyToOne(() => PurchaseEntity, (purchase) => purchase.clients)
  @JoinColumn({
    name: 'purchase_id',
  })
  purchase: PurchaseEntity;

  @Column({
    name: 'purchase_id',
  })
  purchaseId: number;
}
