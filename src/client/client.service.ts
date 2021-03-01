import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/core/database/client.entity';
import { Purchase } from 'src/core/database/purchase.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(Client)
        private clientRepository: Repository<Client>
    ) {}

    async updateClientVerificationInfo(id: number, port: number): Promise<void> {
        await this.clientRepository.update(id, {port: port});
    }

    async verifyNewClient(purchase: Purchase, ip: string, token: string, port: number): Promise<void> {
        await this.clientRepository.save({
            purchase: purchase,
            ip: ip,
            token: token,
            port: port
        });
    }

    async disableClient(ip: string, purchase?: Purchase) {
        const query: Partial<Client> = {
            ip: ip
        };
        if(purchase != null) {
            query.purchase = purchase;
        }
        this.clientRepository.update(query, {
            enabled: false
        });
    }
 }
