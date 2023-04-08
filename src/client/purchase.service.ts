import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseEntity } from 'src/core/database/purchase.entity';
import Sale from 'src/core/model/sale';
import { Repository } from 'typeorm';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(PurchaseEntity)
    private purchaseRepository: Repository<PurchaseEntity>,
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
  }): Promise<PurchaseEntity> {
    return this.purchaseRepository.save({
      applicationId: input.applicationId,
      purchase_code: input.purchaseCode,
      buyer: input.sale.buyer,
      amount_paid: input.sale.amount,
      purchased_at: new Date(input.sale.sold_at),
      license_count: 1,
    });
  }
}
