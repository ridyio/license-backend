import { CRUDResolver } from "@nestjs-query/query-graphql";
import { UseGuards } from "@nestjs/common";
import { Resolver } from "@nestjs/graphql";
import { Client } from "src/core/database/client.entity";
import { GqlAuthGuard } from "../gql.auth.guard";
import { ClientModel } from "./client.model";
import { ClientService } from "./client.service";

@Resolver(Client)
@UseGuards(GqlAuthGuard)
export class ClientResolver extends CRUDResolver(ClientModel) {
    constructor(
        private clientService: ClientService
    ) {
        super(clientService);
    }
}