import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Gstin, Invoice, InvoiceDetail } from './../../models';
import { CommonService, InvoiceService } from './../../services';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html'  
})
export class PurchaseComponent implements OnInit {
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

    this.invoiceService.getAllInvoices(this.currentGstinId, 'p')
    .subscribe(data => {
      this.invoices = data;
    });
  }

}