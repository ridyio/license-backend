import { Injectable } from '@nestjs/common';
import { ApplicationEntity } from '../core/database/application.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(ApplicationEntity)
    private applicationRepository: Repository<ApplicationEntity>,
  ) {}

  async getByItemId(itemId: number): Promise<ApplicationEntity | null> {
    return await this.applicationRepository.findOne({
      where: { envatoItemCode: itemId },
    });
  }
}
