import { FilterableField, Relation } from "@nestjs-query/query-graphql";
import { Field, Float, GraphQLTimestamp, ID, Int, ObjectType } from "@nestjs/graphql";
import { ClientModel } from "../client/client.model";

@ObjectType('Purchase')
@Relation('clients', () => [ClientModel])
export class PurchaseModel {
    @FilterableField(() => ID)
    id: number;

    purchaseCode: string;

    buyerUserName?: string;

    vip: boolean;

    enabled: boolean;

    details?: string;

    email?: string;

    @Field(() => Int)
    licenseCount: number;

    @Field(() => GraphQLTimestamp)
    purchasedAt?: string;

    @Field(() => Float)
    amountPaid: number;
}