import { Component, Inject, OnInit } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Business, Contact } from './../../models';
import { ContactService, CommonService, StateService } from './../../services';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PAN_REGEX = /[A-Z]{5}\d{4}[A-Z]{1}/;
const GST_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

@Component({
    selector: 'contact-add-dialog',
    templateUrl: './contact-add.dialog.html'
})

export class ContactAddDialog implements OnInit {
    //business form model
    currentBusiness: Business;
    formGroup: FormGroup;
    states: any;
    contact: Contact;

    constructor(
        private dialogRef: MdDialogRef<ContactAddDialog>,
        @Inject(MD_DIALOG_DATA) public data: Contact,
        private formBuilder: FormBuilder,
        private contactService: ContactService,
        private commonService: CommonService,
        private stateService: StateService
    ) {        
        this.contact = data;
        this.currentBusiness = this.commonService.getCurrentBusiness();

        this.formGroup = this.formBuilder.group({
            name: ['', Validators.required],
            pan: ['', Validators.pattern(PAN_REGEX)],
            gstin: ['', [Validators.required, Validators.pattern(GST_REGEX)]],
            contactPerson: [''],
            mobile: [''],
            state: ['24', Validators.required],
            address: [''],
            pinCode: [''],
            city: [''],
            email: ['', Validators.pattern(EMAIL_REGEX)],
            landline: [''],
            country: ['']
        });
    }

    ngOnInit() {
        this.states = this.stateService.getAll();        
        if (this.contact) {
            this.formGroup.setValue({
                name: this.contact.name,
                pan: this.contact.pan,
                gstin: this.contact.gstin,
                contactPerson: this.contact.contactPerson,
                mobile: this.contact.mobile,
                state: this.contact.state,
                address: this.contact.address,
                pinCode: this.contact.pinCode,
                city: this.contact.city,
                email: this.contact.email,
                landline: this.contact.landline,
                country: this.contact.country ? this.contact.country : ''
            });
        }

    }

    onClose(result: string) {       
        this.dialogRef.close('close');
    }

    onSubmit() {        
        if (this.formGroup.valid) {
            let viewModel = this.formGroup.value;

            this.contact = {
                id: this.contact ? this.contact.id : '',
                name: viewModel.name,
                pan: viewModel.pan,
                gstin: viewModel.gstin,
                contactPerson: viewModel.contactPerson,
                mobile: viewModel.mobile,
                state: viewModel.state,
                address: viewModel.address,
                pinCode: viewModel.pinCode,
                city: viewModel.city,
                email: viewModel.email,
                landline: viewModel.landline,
                country: viewModel.country
            }

            if (this.contact.id) {
                this.contactService.updateContact(this.currentBusiness.id, this.contact)
                    .subscribe(res => {
                        this.dialogRef.close('success');
                    },
                    err => {
                        console.log(err);
                        this.dialogRef.close('error');
                    });
            } else {
                this.contactService.addContact(this.currentBusiness.id, this.contact)
                    .subscribe(res => {
                        this.dialogRef.close('success');
                    },
                    err => {
                        console.log(err);
                        this.dialogRef.close('error');
                    });
            }
        } else {
            // raise alert message about error
        }

    }
}