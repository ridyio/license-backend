import { Injectable } from '@nestjs/common';
import Sale from 'src/core/model/sale';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class EnvatoService {
  constructor(private http: HttpService) {}
  async getSaleInfo(purchaseCode: string): Promise<Sale> {
    let sale = await firstValueFrom(
      this.http.get<Sale>(
        `https://api.envato.com/v3/market/author/sale?code=${purchaseCode}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.TOKEN}`,
          },
        },
      ),
    );
    if (sale.data.buyer === undefined) {
      throw new Error('Invalid Purchase Code!');
    }
    return sale.data;
  }
}
