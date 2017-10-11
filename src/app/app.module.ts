import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // for animation
import 'hammerjs';

import { GstAppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BusinessComponent, AddBusinessDialog, AddGstinDialog } from './business';
import { ChangePasswordDialog } from './change-password';
import { AuthGuard, AppMaterialModule, httpFactory, InterceptedHttp, ConfirmDialog } from './common';
import { ContactComponent, ContactAddDialog } from './contact';
import { AddressDialog, SalesComponent, PurchaseComponent, InvoiceEditComponent } from './invoices';
import { LoginComponent } from './login';
import {  AuthService, BusinessService, CommonService, ContactService,
  InvoiceService, ItemService, StateService } from './services';
import { PageNotFoundComponent  } from './shared';
import { ItemComponent, ItemAddDialog } from './item';

@NgModule({
  declarations: [
    AppComponent,
    BusinessComponent,    
    AddBusinessDialog,
    AddGstinDialog,
    ChangePasswordDialog,
    ContactComponent,
    ContactAddDialog,
    AddressDialog,
    SalesComponent,
    PurchaseComponent,
    InvoiceEditComponent,    
    LoginComponent,
    PageNotFoundComponent,
    ItemComponent,
    ItemAddDialog,
    ConfirmDialog
  ],
  imports: [    
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    HttpModule,    
    GstAppRoutingModule,
    NgbModule.forRoot()
  ],
  providers: [
    AuthGuard,
    AuthService,
    BusinessService,
    CommonService,
    ContactService,
    InvoiceService,
    ItemService,    
    StateService,
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [ XHRBackend, RequestOptions ]
  }
  ],
  entryComponents: [ AddBusinessDialog, AddressDialog, ChangePasswordDialog, ContactAddDialog, ItemAddDialog, ConfirmDialog, AddGstinDialog ],
  bootstrap: [AppComponent]
})
export class AppModule { }
