import { Address } from './address';
import { InvoiceDetail } from './invoice-detail';

export class Invoice {
    constructor (
        public id: string,
        public gstinId: string,
        public invoiceSequenceNo: string,
        public invoiceDate: Date,
        public invoiceType: string,
        public reference: string,
        public dueDate: Date,
        public contactId: string,
        public contactName: string,
        public contactGstin: string,        
        public billingAddress: Address,
        public shippingAddress: Address,
        public placeOfSupply: string,
        public invoiceDetails: InvoiceDetail[]
    ) {}
}