import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { ApplicationEntity } from '../core/database/application.entity';
import { ClientEntity } from '../core/database/client.entity';
import { PurchaseEntity } from '../core/database/purchase.entity';
import { ApplicationService } from './application.service';
import { ClientService } from './client.service';
import { PurchaseService } from './purchase.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ApplicationEntity, ClientEntity, PurchaseEntity]),
    HttpModule,
  ],
  providers: [ClientService, ApplicationService, PurchaseService],
  exports: [ClientService, ApplicationService, PurchaseService],
})
export class ClientModule {}
