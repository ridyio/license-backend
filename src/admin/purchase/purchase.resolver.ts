import { CRUDResolver } from '@nestjs-query/query-graphql';
import { UseGuards } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { Purchase } from 'src/core/database/purchase.entity';
import { GqlAuthGuard } from '../gql.auth.guard';
import { PurchaseModel } from './purchase.model';
import { PurchaseService } from './purchase.service';

@Resolver(() => Purchase)
@UseGuards(GqlAuthGuard)
export class PurchaseResolver extends CRUDResolver(PurchaseModel) {
    constructor(
        private purchaseService: PurchaseService
    ) {
        super(purchaseService);
    }
}
