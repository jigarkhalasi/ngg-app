import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';

import { Business, Gstin } from './models'
import { AuthService, BusinessService, CommonService } from './services'
import { ChangePasswordDialog } from './change-password';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  gstinId: string;
  gstin: Gstin;
  businessId: string;
  business: Business;

  businesses: Business[];
  gstinArray: any = [];

  constructor(
    private router: Router,
    private dialog: MdDialog,
    private authService: AuthService,
    private businessService: BusinessService,
    private commonService: CommonService
  ) {
  }

  ngOnInit() {    
    if (this.authService.isAuthenticated) {
      this.loadBusiness();

      this.business = this.commonService.getCurrentBusiness();
      this.businessId = this.business ? this.business.id : '';

      this.gstin = this.commonService.getCurrentGstin();
      this.gstinId = this.gstin ? this.gstin.id : '';
    }
  }

  loadBusiness() {
    this.businessService.getAllBusiness()
      .subscribe(businesses => {
        this.businesses = businesses

        this.businesses.forEach(b => {          
          b.gstins.forEach(g => {            
            this.gstinArray.push({ businessId: b.id, gstinId: g.id, displayName: g.displayName, gstin: g.gstin });
          });
        });

      },
      err => {
        console.log(err);
      });
  }

  onChangeGstin() {    
    if (this.gstinId) {
      let tGstin = this.gstinArray.find(g => g.gstinId = this.gstinId);
      this.business = this.businesses.find(b => b.id == tGstin.businessId);
      this.gstin = this.business.gstins.find(g => g.id == this.gstinId);

      this.commonService.setCurrentBusiness(this.business);
      this.commonService.setCurrentGstin(this.gstin);
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  openChangePasswordDialog() {
    let dialogRef = this.dialog.open(ChangePasswordDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {

      } else {
        this.businesses = result;
      }
    });
  }
}
