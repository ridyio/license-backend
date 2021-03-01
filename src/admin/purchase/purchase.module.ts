import { PurchaseService } from './purchase.service';
import { Module } from '@nestjs/common';
import { PurchaseResolver } from './purchase.resolver';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Purchase } from 'src/core/database/purchase.entity';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';

@Module({
    imports: [
        NestjsQueryTypeOrmModule.forFeature([Purchase]),
        NestjsQueryGraphQLModule.forFeature({
            imports: [],
            resolvers: [],
        })
    ],
    controllers: [],
    providers: [
        PurchaseService,
        PurchaseResolver],
})
export class PurchaseModule { }
