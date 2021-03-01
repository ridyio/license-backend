import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from 'src/core/database/application.entity';
import { Purchase } from 'src/core/database/purchase.entity';
import Sale from 'src/core/model/sale';
import { Repository } from 'typeorm';

@Injectable()
export class PurchaseService { 
    constructor(
        @InjectRepository(Purchase)
        private purchaseRepository: Repository<Purchase>
    ) {}
    
    async getFromPurchaseCode(purchaseCode: string): Promise<Purchase> {
        return await this.purchaseRepository.findOne({
            purchaseCode: purchaseCode
        }, {
            relations: ['clients']
        })
    }

    async insertPurchaseRecord(application: Application, sale: Sale, purchaseCode: string): Promise<Purchase> {
        return await this.purchaseRepository.save({
            application: application,
            purchase_code: purchaseCode,
            buyer: sale.buyer,
            amount_paid: sale.amount,
            purchased_at: sale.sold_at.split('+')[0],
            license_count: 1
        })
    }
}
