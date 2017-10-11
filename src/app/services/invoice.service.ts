import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Address, Invoice, InvoiceDetail } from './../models';

@Injectable()
export class InvoiceService {

  constructor(
    private http: Http
  ) { }

  getAllInvoices(gstinId: string, invoiceType: string): Observable<Invoice[]> {
    return this.http.get("v1/gstin/" + gstinId + "/invoice/type/" + invoiceType)
      .map(this.mapInvoices);
  }

  getInvoice(gstinId: string, invoiceId: string): Observable<Invoice> {
    return this.http.get("v1/gstin/" + gstinId + "/invoice/" + invoiceId)
      .map(this.mapInvoice);
  }

  addInvoice(gstinId: string, invoice: Invoice) {
    return this.http.post('v1/gstin/' + gstinId + '/invoice/add', invoice)
      .map(this.mapInvoice);
  }

  updateInvoice(gstinId: string, invoice: Invoice) {
    return this.http.post('v1/gstin/' + gstinId + '/invoice/update', invoice)
      .map(this.mapInvoice);
  }

  private mapInvoices(res: Response): Invoice[] {

    return res.json().map(r => <Invoice>({
      id: r._id,
      gstinId: r.gstinId,
      invoiceSequenceNo: r.invoiceSequenceNo,
      invoiceDate: r.invoiceDate,
      invoiceType: r.invoiceType,
      reference: r.reference,
      dueDate: r.dueDate,
      contactId: r.contactId,
      contactName: r.contactName,
      contactGstin: r.contactGstin,
      billingAddress: <Address>r.billingAddress,
      shippingAddress: <Address>r.shippingAddress,
      placeOfSupply: r.placeOfSupply,
      invoiceDetails: r.invoiceDetails.map(d => <InvoiceDetail>({
        id: d._id,
        itemOrdinal: d.itemOrdinal,
        itemDescription: d.itemDescription,
        itemType: d.itemType,
        hsnCode: d.hsnCode,
        qty: d.qty,
        ratePerItem: d.ratePerItem,
        discount: d.discount,
        taxableValue: d.taxableValue,
        cgstPer: d.cgstPer,
        cgstAmount: d.cgstAmount,
        sgstPer: d.sgstPer,
        sgstAmount: d.sgstAmount,
        igstPer: d.igstPer,
        igstAmount: d.igstAmount,
        cessPer: d.cessPer,
        cessAmount: d.cessAmount,
        total: d.total
      }))
    }));
  }

  private mapInvoice(res: Response): Invoice {
    let r = res.json();
    let invoice = <Invoice>({
      id: r._id,
      gstinId: r.gstinId,
      invoiceSequenceNo: r.invoiceSequenceNo,
      invoiceDate: r.invoiceDate,
      invoiceType: r.invoiceType,
      reference: r.reference,
      dueDate: r.dueDate,
      contactId: r.contactId,
      contactName: r.contactName,
      contactGstin: r.contactGstin,
      billingAddress: <Address>r.billingAddress,
      shippingAddress: <Address>r.shippingAddress,
      placeOfSupply: r.placeOfSupply,
      invoiceDetails: r.invoiceDetails.map(d => <InvoiceDetail>({
        id: d._id,
        itemOrdinal: d.itemOrdinal,
        itemDescription: d.itemDescription,
        itemType: d.itemType,
        hsnCode: d.hsnCode,
        qty: d.qty,
        ratePerItem: d.ratePerItem,
        discount: d.discount,
        taxableValue: d.taxableValue,
        cgstPer: d.cgstPer,
        cgstAmount: d.cgstAmount,
        sgstPer: d.sgstPer,
        sgstAmount: d.sgstAmount,
        igstPer: d.igstPer,
        igstAmount: d.igstAmount,
        cessPer: d.cessPer,
        cessAmount: d.cessAmount,
        total: d.total
      }))
    });
    return invoice;
  }

  getBlankInvoiceRecord() {

    let invoice = {
      id: '',
      gstinId: '',
      invoiceSequenceNo: '',
      invoiceDate: new Date(),
      invoiceType: '',
      reference: '',
      dueDate: new Date(),
      contactId: '',
      contactName: '',
      contactGstin: '',
      billingAddress: {
        address: '',
        city: '',
        pinCode: '',
        state: ''
      },
      shippingAddress: {
        address: '',
        city: '',
        pinCode: '',
        state: ''
      },
      placeOfSupply: '',
      invoiceDetails: []
    };

    invoice.invoiceDetails[0] = this.getBlankInvoiceDetailRecord();
    invoice.invoiceDetails[0].itemOrdinal = 0;
    invoice.invoiceDetails[1] = this.getBlankInvoiceDetailRecord();
    invoice.invoiceDetails[1].itemOrdinal = 1;
    invoice.invoiceDetails[2] = this.getBlankInvoiceDetailRecord();
    invoice.invoiceDetails[2].itemOrdinal = 2;

    return invoice;
  }

  getBlankInvoiceDetailRecord() {
    let invoiceDetail = {
      id: '',
      itemOrdinal: 1,
      itemDescription: '',
      itemType: 'G',
      hsnCode: '',
      qty: 1,
      ratePerItem: null,
      discount: null,
      taxableValue: null,
      cgstPer: 0,
      cessAmount: null,
      sgstPer: 0,
      sgstAmount: null,
      igstPer: 0,
      igstAmount: null,
      cessPer: 0,
      cgstAmount: null,
      total: null
    };
    //new InvoiceDetail ('', 1, '', 1, '', 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    return invoiceDetail;
  }
}
