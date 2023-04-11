import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseEntity } from './core/database/purchase.entity';
import { Repository } from 'typeorm';
import { EnvatoService } from './envato/envato.service';
import { ApplicationService } from './client/application.service';
import { PurchaseService } from './client/purchase.service';
import { ClientService } from './client/client.service';
import { Token } from 'graphql';
import * as shortid from 'shortid';
@Injectable()
export class AppService {
  constructor(
    private envatoService: EnvatoService,
    private applicationService: ApplicationService,
    private purchaseService: PurchaseService,
    private clientService: ClientService,
  ) {}

  async verify(input: IVerifyInput): Promise<IVerifyResponse> {
    try {
      Logger.log(
        `server with ip ${input.ip}, Port ${input.port} and purchase code ${input.purchaseCode} has requested verification`,
      );
      let purchase = await this.purchaseService.findWithPurchaseCode(
        input.purchaseCode,
      );
      if (purchase == null) {
        const sale = await this.envatoService.getSaleInfo(input.purchaseCode);
        const application = await this.applicationService.getByItemId(
          sale.item.id,
        );
        if (application == null) {
          return {
            status: 'FAILED',
            message: 'It seems to be an Envato application but not ours.',
          };
        }
        purchase = await this.purchaseService.insertPurchaseRecord({
          applicationId: application.id,
          sale: sale,
          purchaseCode: input.purchaseCode,
          email: input.email,
        });
      }
      if (!purchase.enabled) {
        Logger.log(`Purchase Code is disabled ${input.purchaseCode}!`);
        return {
          status: 'FAILED',
          message: 'Purchase code is disabled!',
        };
      }
      const clients = await this.clientService.findClientsByPurchaseId(
        purchase.id,
      );
      if (
        input.email != null &&
        purchase.email != null &&
        purchase.email.includes(input.email) == false
      ) {
        this.purchaseService.purchaseRepository.update(purchase.id, {
          email: purchase.email + ',' + input.email,
        });
      }
      if (input.email != null && purchase.email == null) {
        this.purchaseService.purchaseRepository.update(purchase.id, {
          email: input.email,
        });
      }
      let disabledCount = 0;
      for (const client of clients) {
        if (client.ip === input.ip && client.enabled === true) {
          const _ = this.clientService.updateClientVerificationInfo(client.id, {
            port: input.port,
            lastVerifiedAt: new Date(),
          });
          return {
            status: 'OK',
            token: client.token,
            message: 'This server has been verified to use the application.',
          };
        }
        if (client.enabled == false) {
          disabledCount += 1;
        }
      }
      if (disabledCount > 3) {
        Logger.log('Purchase Code Overused.');
        return {
          status: 'FAILED',
          message: `This purchase code is being used more than usual. Please contact ${process.env.CONTACT_EMAIL} with your purchase code for more information if needed.`,
        };
      }
      const enabledClients = clients.length - disabledCount;
      if (enabledClients < purchase.licenseCount) {
        const token =
          clients.length < 1 ? shortid.generate() : clients[0].token;
        this.clientService.verifyClient({
          purchaseId: purchase.id,
          ip: input.ip,
          token: token,
          port: input.port,
        });
        return {
          status: 'OK',
          token,
          message:
            'Your server is verified now to use the application. (Thanks for the purchase :) )',
        };
      } else {
        return {
          status: 'USED',
          clients,
        };
      }
    } catch (err) {
      Logger.log(err.message);
      return { status: 'FAILED', message: err.message };
    }
  }

  async disableClient(
    input: IDisableClientInput,
  ): Promise<IDisableClientResponse> {
    try {
      if (input.purchaseCode != null) {
        const purchase = await this.purchaseService.findWithPurchaseCode(
          input.purchaseCode,
        );
        if (purchase == null) {
          throw new Error('Purchase Code not found!');
        }
      }
      await this.clientService.disableClient(input.ip);
      return {
        status: 'OK',
        message: 'Client disabled successfully.',
      };
    } catch (err) {
      Logger.log(err.message);
      return { status: 'FAILED', message: err.message };
    }
  }
}

export interface IVerifyInput {
  purchaseCode: string;
  port: number;
  ip: string;
  email?: string;
}

export interface IVerifyResponse {
  status: 'OK' | 'FAILED' | 'USED';
  message?: string;
  token?: string;
  clients?: IClientResponse[];
}

export interface IClientResponse {
  ip: string;
  enabled: boolean;
}

export interface IDisableClientInput {
  purchaseCode?: string;
  ip: string;
}

export interface IDisableClientResponse {
  status: 'OK' | 'FAILED';
  message?: string;
}
