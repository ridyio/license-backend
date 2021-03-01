export default class Sale {
    amount: number
    sold_at: string
    license: License
    item: EnvatoItem
    buyer: string
}

export enum License {
    Regular = 'Regular License',
    Extended = 'Extended License'
}

export class EnvatoItem {
    id: number
    name: string
}
