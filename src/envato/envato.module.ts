import { Module } from '@nestjs/common';
import { EnvatoService } from './envato.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [EnvatoService],
  exports: [EnvatoService],
})
export class EnvatoModule {}
