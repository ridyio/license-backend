import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Application } from 'src/core/database/application.entity';
import { Client } from 'src/core/database/client.entity';
import { Purchase } from 'src/core/database/purchase.entity';
import { ApplicationService } from './application.service';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { EnvatoService } from '../envato/envato.service';
import { PurchaseService } from './purchase.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Application, Client, Purchase]),
    HttpModule,
  ],
  controllers: [ClientController],
  providers: [
    ClientService,
    ApplicationService,
    PurchaseService,
    ClientService,
    EnvatoService,
  ],
})
export class ClientModule {}
