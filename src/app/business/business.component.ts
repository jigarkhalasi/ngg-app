import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';

import { Business, Gstin } from './../models';
import { AddBusinessDialog } from './dialog/business-add.dialog';
import { AddGstinDialog } from './dialog/gst-add.dialog';
import { ConfirmDialog } from './../common/dialog/confirm.dialog';
import { BusinessService } from './../services';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent implements OnInit {

  businesses: Business[];
  closeResult: string;

  constructor(
    private router: Router,
    private dialog: MdDialog,
    private businessService: BusinessService
  ) {
  }

  ngOnInit() {
    this.loadBusiness()
  }

  loadBusiness() {
    this.businessService.getAllBusiness()
      .subscribe(
      businesses => {        
        this.businesses = businesses
      },
      err => {
        console.log(err);
      });
  }

  openAddBusiness(businessModel) {
    debugger;
    let dialogRef = this.dialog.open(AddBusinessDialog, {
      data: businessModel != null ? businessModel : null,
    });
    dialogRef.afterClosed().subscribe(result => {
      debugger;
      if (result === true) {

      } else {
        this.loadBusiness();
      }
    });
  }

  openAddGstIn(businessModel, gstinModel) {
    debugger;
    let dialogRef = this.dialog.open(AddGstinDialog, {
      data: { businessId: businessModel.id, gstinModel: gstinModel != null ? gstinModel : null }
    });
    dialogRef.afterClosed().subscribe(result => {
      debugger;
      if (result === true) {
        this.loadBusiness();
      }
    });
  }

  removeBusiness(businessModel) {
    let dialogRef = this.dialog.open(ConfirmDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.businessService.removeBusiness(businessModel.id)
          .subscribe(
          businesses => {
            debugger;
            this.businesses = this.businesses.filter(business => business.id !== businessModel.id);
          },
          err => {
            console.log(err);
          });
      }
    });
  }

  removeGstin(businessModel, gstinModel) {
    let dialogRef = this.dialog.open(ConfirmDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.businessService.removeGstIn(businessModel.id, gstinModel.id)
          .subscribe(
          businesses => {
            this.loadBusiness();
          },
          err => {
            console.log(err);
          });
      }
    });
  }
}