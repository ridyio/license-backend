import { Injectable } from '@nestjs/common';
import { Application } from 'src/core/database/application.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ApplicationService {
    constructor(
        @InjectRepository(Application)
        private applicationRepository: Repository<Application>
    ) {}

    async getByItemId(itemId: number): Promise<Application> {
        return await this.applicationRepository.findOne({ envatoId: itemId });
    }
 }
