import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/core/database/client.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientService extends TypeOrmQueryService<Client> { 
    constructor(
        @InjectRepository(Client)
        private clientRepository: Repository<Client>
    ) {
        super(clientRepository);
    }
}
