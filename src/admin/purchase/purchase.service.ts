import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Purchase } from 'src/core/database/purchase.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PurchaseService extends TypeOrmQueryService<Purchase> {
    constructor(
        @InjectRepository(Purchase)
        private purchaseRepo: Repository<Purchase>
    ) {
        super(purchaseRepo);
    }
}
