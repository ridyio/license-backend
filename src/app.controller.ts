import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService, IVerifyResponse } from './app.service';
import { FastifyReply, FastifyRequest } from 'fastify';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}
  @Get('verify')
  async verify(
    @Req() req: FastifyRequest<{ Querystring: IVerifyRequest }>,
    @Res() res: FastifyReply,
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
    @Res() res: FastifyReply,
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
