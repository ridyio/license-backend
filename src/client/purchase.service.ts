import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicationEntity } from 'src/core/database/application.entity';
import { PurchaseEntity } from 'src/core/database/purchase.entity';
import Sale from 'src/core/model/sale';
import { Repository } from 'typeorm';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(PurchaseEntity)
    public purchaseRepository: Repository<PurchaseEntity>,
  ) {}

  async findWithPurchaseCode(
    purchaseCode: string,
  ): Promise<PurchaseEntity | null> {
    return await this.purchaseRepository.findOne({
      where: { purchaseCode },
      relations: {
        clients: true,
      },
    });
  }

  async insertPurchaseRecord(input: {
    applicationId: number;
    sale: Sale;
    purchaseCode: string;
    email?: string;
  }): Promise<PurchaseEntity> {
    const purchase = new PurchaseEntity();
    purchase.application_id = input.applicationId;
    purchase.purchaseCode = input.purchaseCode;
    purchase.buyerUserName = input.sale.buyer;
    purchase.amountPaid = input.sale.amount;
    purchase.purchasedAt = new Date(input.sale.sold_at);
    purchase.email = input.email;
    purchase.licenseCount = 1;
    return await this.purchaseRepository.save(purchase);
  }
}
