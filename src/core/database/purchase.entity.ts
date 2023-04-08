import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApplicationEntity } from './application.entity';
import { ClientEntity } from './client.entity';

@Entity('purchase')
export class PurchaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'purchase_code',
  })
  purchaseCode: string;

  @Column({
    nullable: true,
    name: 'buyer',
  })
  buyerUserName?: string;

  @Column({
    default: false,
  })
  vip: boolean;

  @Column({
    default: true,
  })
  enabled: boolean;

  @Column({
    nullable: true,
  })
  details?: string;

  @Column('text', {
    nullable: true,
  })
  email?: string;

  @Column('tinyint', {
    name: 'license_count',
    default: 1,
  })
  licenseCount: number;

  @CreateDateColumn({
    name: 'purchased_at',
  })
  purchasedAt?: Date;

  @Column('float', {
    name: 'amount_paid',
    default: 0.0,
  })
  amountPaid: number;

  @ManyToOne(() => ApplicationEntity, (application) => application.purchases)
  application: ApplicationEntity;

  @Column({
    name: 'application_id',
  })
  applicationId: number;

  @OneToMany(() => ClientEntity, (client) => client.purchase)
  clients: ClientEntity[];
}
