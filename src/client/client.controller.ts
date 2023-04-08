import {
  Controller,
  ForbiddenException,
  Get,
  NotFoundException,
  Query,
  Req,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Request } from 'express';
import * as shortid from 'shortid';
import { VerifyResponse } from 'src/core/model/server-result';
import { ApplicationService } from './application.service';
import { ClientService } from './client.service';
import { EnvatoService } from '../envato/envato.service';
import { PurchaseService } from './purchase.service';

@Controller()
export class ClientController {
  constructor(
    private envatoService: EnvatoService,
    private purchaseService: PurchaseService,
    private applicationService: ApplicationService,
    private clientService: ClientService,
  ) {}

  @Get('verify')
  async verify(
    @Query('purchaseCode') purchaseCode: string,
    @Query('port') usedPort: string,
    @Req() request: Request,
  ): Promise<VerifyResponse> {
    if (purchaseCode === undefined) {
      throw new UnprocessableEntityException();
    }
    const ip = request.headers['x-forwarded-for'];
    const port = parseInt(usedPort, 10) || 8080;
    let purchase = await this.purchaseService.getFromPurchaseCode(purchaseCode);
    if (purchase === undefined) {
      const license = await this.envatoService.getSaleInfo(purchaseCode);
      const application = await this.applicationService.getByItemId(
        license.item.id,
      );
      if (application === undefined) {
        throw new NotFoundException();
      }
      purchase = await this.purchaseService.insertPurchaseRecord(
        application,
        license,
        purchaseCode,
      );
    }
    if (purchase.enabled == false) {
      throw new ForbiddenException();
    }
    let disabledCount = 0;
    for (const client of purchase.clients) {
      if (client.ip === ip && client.enabled == true) {
        this.clientService.updateClientVerificationInfo(client.id, port);
        return {
          status: 'OK',
          token: client.token,
        };
      }
      if (!client.enabled) {
        disabledCount += 1;
      }
    }
    if (disabledCount > 3) {
      return {
        status: 'FAILED',
        message: `This purchase code is being used more than usual. Please contact ${process.env.CONTACT_EMAIL} with your purchase code for more information if needed.`,
      };
    }
    const enabledClients = purchase.clients.length - disabledCount;
    if (enabledClients < purchase.licenseCount) {
      const token =
        purchase.clients.length < 1
          ? shortid.generate()
          : purchase.clients[0].token;
      await this.clientService.verifyNewClient(
        purchase,
        ip as string,
        token,
        port,
      );
      return {
        status: 'OK',
        token: token,
      };
    } else {
      return {
        status: 'USED',
        clients: purchase.clients,
      };
    }
  }

  @Get('disable_one')
  async disableOne(
    @Query('ip') ip: string,
    @Query('purchaseCode') purchaseCode: string,
  ) {
    let purchase = null;
    if (purchaseCode != null) {
      purchase = await this.purchaseService.getFromPurchaseCode(purchaseCode);
    }
    await this.clientService.disableClient(ip, purchase);
    return {
      status: 'OK',
    };
  }
}
