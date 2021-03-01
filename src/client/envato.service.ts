import { HttpService, Injectable } from '@nestjs/common';
import Sale from 'src/core/model/sale';

@Injectable()
export class EnvatoService {
    constructor(
        private http: HttpService
    ) {}
    async getSaleInfo(purchaseCode: string): Promise<Sale> {
        return (await (this.http.get<Sale>(`https://api.envato.com/v3/market/author/sale?code=${purchaseCode}`, {
            headers: {
                Authorization: `Bearer ${process.env.TOKEN}`
            }
        }).toPromise())).data;
    }
}
