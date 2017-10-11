import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Gstin, Invoice, InvoiceDetail } from './../../models';
import { CommonService, InvoiceService } from './../../services';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html'  
})
export class SalesComponent implements OnInit {
  currentGstin: Gstin;
  currentGstinId: string;  

  invoices: Invoice[] = [];  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService,
    private invoiceService: InvoiceService
  ) { }

  ngOnInit() {    
    this.currentGstin = this.commonService.getCurrentGstin();
    this.currentGstinId = this.currentGstin.id;   

    this.invoiceService.getAllInvoices(this.currentGstinId, 's')
    .subscribe(data => {
      this.invoices = data;
    });
  }

  getGrandTotal(invoice) {
    let grandTotal = 0;

    for (let i in invoice.invoiceDetails) {
      let model = invoice.invoiceDetails[i];
      
      grandTotal += (model.total > 0 ? +model.total : 0);
    }

    return grandTotal;
  }
}