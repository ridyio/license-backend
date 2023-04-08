import { Controller, Get, Req } from '@nestjs/common';
import { AppService, IVerifyResponse } from './app.service';
import { FastifyRequest } from 'fastify';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get()
  async root(): Promise<string> {
    return '✅ Running!';
  }

  @Get('verify')
  async verify(
    @Req() req: FastifyRequest<{ Querystring: IVerifyRequest }>,
  ): Promise<IVerifyResponse> {
    return this.appService.verify({
      purchaseCode: req.query.purchase_code,
      port: req.query.port,
      ip: req.ip,
      email: req.query.email,
    });
  }

  @Get('disable_one')
  async disableOne(
    @Req() req: FastifyRequest<{ Querystring: IDisableClientRequest }>,
  ): Promise<IDisableClientResponse> {
    await this.appService.disableClient({
      ip: req.query.ip,
      purchaseCode: req.query.purchase_code,
    });
    return {
      status: 'OK',
    };
  }
}

export interface IVerifyRequest {
  purchase_code: string;
  port: number;
  email?: string;
}

export interface IDisableClientRequest {
  ip: string;
  purchase_code?: string;
}

export interface IDisableClientResponse {
  status: 'OK' | 'FAILED';
  message?: string;
}
