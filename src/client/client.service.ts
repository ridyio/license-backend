import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { ClientEntity } from 'src/core/database/client.entity';
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
    const updateResult = await this.clientRepository.update(
      {
        ip,
      },
      {
        enabled: false,
      },
    );
    if (updateResult.affected > 0) {
      firstValueFrom(
        this.httpService.post(
          `http://${ip.replace('::ffff:', '')}:4001/reconfig`,
        ),
      );
    }
    return updateResult.affected > 0;
  }
}
