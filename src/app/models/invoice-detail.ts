export class InvoiceDetail {
    constructor (
        public id: string,
        public itemOrdinal: number,
        public itemDescription: string,
        public itemType: string,
        public hsnCode: string,
        public qty: number,
        public ratePerItem: number,
        public discount: number,
        public taxableValue: number,
        public cgstPer: number,
        public cgstAmount: number,
        public sgstPer: number,
        public sgstAmount: number,
        public igstPer: number,
        public igstAmount: number,
        public cessPer: number,
        public cessAmount: number,
        public total: number
    ) {}
}