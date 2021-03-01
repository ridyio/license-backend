import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { Client } from 'src/core/database/client.entity';
import { ClientResolver } from './client.resolver';
import { ClientService } from './client.service';

@Module({
    imports: [
        NestjsQueryTypeOrmModule.forFeature([Client]),
        NestjsQueryGraphQLModule.forFeature({ imports: [], resolvers: [] })
    ],
    controllers: [],
    providers: [
        ClientService,
        ClientResolver
    ],
})
export class ClientModule {}
