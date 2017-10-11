import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './common';
import { BusinessComponent } from './business';
import { ContactComponent } from './contact';
import { ItemComponent } from './item';
import { LoginComponent } from './login';
import { PageNotFoundComponent } from './shared';
import { SalesComponent, PurchaseComponent, InvoiceEditComponent } from './invoices';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        redirectTo: '/businesses',
        pathMatch: 'full'
    },
    {
        path: 'businesses',
        component: BusinessComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'businesses/:businessId/contacts',
        component: ContactComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'sales',
        component: SalesComponent,        
        canActivate: [AuthGuard]
    },
    {
        path: 'purchases',
        component: PurchaseComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'invoices/:invoiceType/create',
        component: InvoiceEditComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'invoices/:invoiceType/:invoiceId/edit',
        component: InvoiceEditComponent,
        canActivate: [AuthGuard]
    },    
    {
        path: 'contacts',
        component: ContactComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'items',
        component: ItemComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(
            routes,
            //{ enableTracing: true }
        )
    ],
    exports: [RouterModule],
    providers: []
})
export class GstAppRoutingModule { }