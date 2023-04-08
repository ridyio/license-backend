import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientEntity } from 'src/core/database/client.entity';
import { PurchaseEntity } from 'src/core/database/purchase.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private clientRepository: Repository<ClientEntity>,
    private httpService: HttpService,
  ) {}

  findClientsByPurchaseId(purchaseId: number): Promise<ClientEntity[]> {
    return this.clientRepository.find({
      where: {
        purchaseId,
      },
    });
  }

  async updateClientVerificationInfo(
    clientId: number,
    update: Partial<ClientEntity>,
  ): Promise<void> {
    await this.clientRepository.update(clientId, update);
  }

  async verifyClient(input: {
    purchaseId: number;
    ip: string;
    token: string;
    port: number;
  }): Promise<ClientEntity> {
    return this.clientRepository.save({
      purchaseId: input.purchaseId,
      ip: input.ip,
      token: input.token,
      port: input.port,
    });
  }

  async disableClient(ip: string): Promise<boolean> {
    await this.clientRepository.update(
      {
        ip,
      },
      {
        enabled: false,
      },
    );
    return true;
  }
}
