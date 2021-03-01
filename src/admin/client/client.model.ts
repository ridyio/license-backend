import { FilterableField, Relation } from "@nestjs-query/query-graphql";
import { Field, GraphQLTimestamp, ID, Int, ObjectType } from "@nestjs/graphql";
import { Purchase } from "src/core/database/purchase.entity";
import { PurchaseModel } from "../purchase/purchase.model";

@ObjectType('Client')
@Relation('purchase', () => PurchaseModel)
export class ClientModel {
    @FilterableField(() => ID)
    id: number;

    ip: string;

    @Field(() => Int)
    port: number;

    token: string;

    enabled: boolean;

    @Field(() => GraphQLTimestamp)
    firstVerifiedAt: number;

    @Field(() => GraphQLTimestamp)
    lastVerifiedAt?: number;
}