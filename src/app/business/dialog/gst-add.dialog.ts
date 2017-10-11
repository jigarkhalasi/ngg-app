import { Component, Inject, OnInit, OnChanges } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/map';

import { Gstin } from './../../models';
import { BusinessService, StateService } from './../../services';

const PAN_REGEX = /[A-Z]{5}\d{4}[A-Z]{1}/;
const GST_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

// this is for add business model
@Component({
    selector: 'gstin-add',
    templateUrl: './gst-add.dialog.html',
})

export class AddGstinDialog {
    //business form model
    gstin: Gstin;
    isEdit: Boolean = false;
    frmTitle: String = "Add";
    GstInForm: FormGroup;
    businessId: String;

    result: {};

    constructor(public dialogRef: MdDialogRef<AddGstinDialog>,
        @Inject(MD_DIALOG_DATA) public data: any,
        private businessService: BusinessService,
        private stateService: StateService,
        private fb: FormBuilder
    ) {
        //this is create the first business form
        this.gstin = data.gstinModel != null ? data.gstinModel : null;
        this.businessId = data.businessId;
        this.GstInForm = this.fb.group({
            id: '',
            gstin: ['', Validators.required],
            displayName: ['', Validators.required]
        });
    }

    ngOnInit() {
        if (this.gstin != null) {
            this.isEdit = true;
            this.frmTitle = "Edit";

            this.GstInForm.reset({
                id: this.gstin.id,
                gstin: this.gstin.gstin,
                displayName: this.gstin.displayName
            });
        }
    }

    onBlurGetStateName() {
        let stateCode = this.GstInForm.controls['gstin'].value.substring(0, 2);
        let state = this.stateService.get(stateCode);
        this.GstInForm.controls['displayName'].setValue(state.stateName);
    }

    onClose(result: string) {
        this.dialogRef.close(result);
    }

    onSubmitGstin() {
        debugger;
        if (this.GstInForm.valid) {
            const gst = this.GstInForm.value;
            this.businessService.updateGstin(this.businessId, gst)
                .subscribe(businesses => {
                    this.dialogRef.close(true);
                },
                err => {
                });
        }
    }
}