import { Component, Inject, OnInit } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Address } from './../../models';
import { StateService } from './../../services';

@Component({
    selector: 'address-dialog',
    templateUrl: './address.dialog.html',
})
export class AddressDialog implements OnInit {
    address: Address;
    formGroup: FormGroup;
    states: any;

    constructor(
        private dialogRef: MdDialogRef<AddressDialog>,
        @Inject(MD_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        private stateService: StateService
    ) {
        
        this.address = data;

        this.states = this.stateService.getAll();
   
        this.formGroup = this.formBuilder.group({
            address: this.address.address,
            city: this.address.city,
            pinCode: this.address.pinCode,
            state: this.address.state
        });
    }

    ngOnInit() {
        
    }

    closeDialog() {
        this.dialogRef.close(true);
    }
    saveAddress() {
        
        // space for validation and other before closing task
        this.dialogRef.close(this.formGroup.value);
    }
}