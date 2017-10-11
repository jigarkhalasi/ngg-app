import { NgModule } from '@angular/core';
import { MdButtonModule, MdCheckboxModule, MdToolbarModule, MdMenuModule, MdSidenavModule, MdButtonToggleModule, MdCardModule,
MdGridListModule, MdListModule, MdDialogModule, MdTableModule, MdInputModule, MdChipsModule, MdProgressSpinnerModule,
MdDatepickerModule, MdNativeDateModule, MdAutocompleteModule, MdSelectModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk';

@NgModule({
  imports: [
    MdButtonModule, MdCheckboxModule, MdToolbarModule, MdMenuModule, MdSidenavModule, MdButtonToggleModule, MdCardModule,
    MdGridListModule, MdListModule, MdDialogModule, MdTableModule, CdkTableModule, MdInputModule, MdChipsModule, MdProgressSpinnerModule,
    MdDatepickerModule, MdNativeDateModule, MdAutocompleteModule, MdSelectModule
  ],
  exports: [
    MdButtonModule, MdCheckboxModule, MdToolbarModule, MdMenuModule, MdSidenavModule, MdButtonToggleModule, MdCardModule,
    MdGridListModule, MdListModule, MdDialogModule, MdTableModule, CdkTableModule, MdInputModule, MdChipsModule, MdProgressSpinnerModule,
    MdDatepickerModule, MdNativeDateModule, MdAutocompleteModule, MdSelectModule
  ],
})
export class AppMaterialModule { }