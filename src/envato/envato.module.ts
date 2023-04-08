import { Module } from '@nestjs/common';
import { EnvatoService } from './envato.service';

@Module({
  imports: [],
  providers: [EnvatoService],
  exports: [EnvatoService],
})
export class EnvatoModule {}
