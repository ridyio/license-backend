import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ClientModule } from './client/client.module';
import { JwtStrategy } from './gql.auth.guard';
import { PurchaseModule } from './purchase/purchase.module';

@Module({
    imports: [
        GraphQLModule.forRoot({
            autoSchemaFile: join(process.cwd(), 'src/schema.gql')
        }),
        PurchaseModule,
        ClientModule
    ],
    providers: [
        JwtStrategy
    ]
})
export class AdminModule {}
