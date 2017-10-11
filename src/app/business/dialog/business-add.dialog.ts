import { Component, Inject, OnInit, OnChanges } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/map';

import { Business, Gstin } from './../../models';
import { BusinessService, StateService } from './../../services';

const PAN_REGEX = /[A-Z]{5}\d{4}[A-Z]{1}/;
const GST_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

// this is for add business model
@Component({
    selector: 'business-add',
    templateUrl: './business-add.dialog.html',
})

export class AddBusinessDialog {
    //business form model
    business: Business;
    isEdit: Boolean = false;
    frmTitle: String = "Add";
    businessForm: FormGroup;
    
    result: {};

    constructor(public dialogRef: MdDialogRef<AddBusinessDialog>,
        @Inject(MD_DIALOG_DATA) public data: any,
        private businessService: BusinessService,
        private stateService: StateService,
        private fb: FormBuilder
    ) {
        //this is create the first business form
        this.business = data != null ? data : null;
        this.businessForm = this.fb.group({
            id: '',
            businessName: ['', Validators.required],
            pan: ['', [Validators.required, Validators.pattern(PAN_REGEX)]],
            logo: '',
            gstins: this.fb.array([])
        });

    }

    ngOnInit() {
        

        if (this.business != null) {
            this.isEdit = true;
            this.frmTitle = "Edit";

            this.businessForm.reset({
                id: this.business.id,
                businessName: this.business.businessName,
                pan: this.business.pan,
                logo: this.business.logo
            });

            this.setGstin(this.business.gstins);

        }
    }


    get gstins(): FormArray {
        return this.businessForm.get('gstins') as FormArray;
    };

    setGstin(gstin: Gstin[]) {
        const gstinFGs = gstin.map(gstin => this.fb.group(gstin));
        const gstinFormArray = this.fb.array(gstinFGs);
        this.businessForm.setControl('gstins', gstinFormArray);
    }

    addGstin() {
        this.gstins.push(this.fb.group(new Gstin("", "", "")));
    }

    onBlurGetStateName(i) {
        
        let gstin = (<FormGroup>(<FormArray>this.businessForm.controls['gstins']).controls[i]).controls['gstin'].value;
        let stateCode = gstin.substring(0, 2);
        let state = this.stateService.get(stateCode);
        ((<FormArray>this.businessForm.controls['gstins']).controls[i]).patchValue({
            displayName: state.stateName
        });
        //control.push(this.initGstin());
    }

    removeGstin(i: number) {
        // remove address from the list
        const control = <FormArray>this.businessForm.controls['gstins'];
        control.removeAt(i);
    }

    onClose(result: string) {

        // space for validation and other before closing task
        this.dialogRef.close(result);
    }

    onSubmitBusiness() {
        //alert("submit business");
        
        if (this.businessForm.valid) {
            const businessModel = this.businessForm.value;
            if (this.business == null) {
                this.businessService.addBusiness(businessModel)
                    .subscribe(res => {
                        
                        this.result = res;
                        this.dialogRef.close(this.result);
                    },
                    err => {
                        console.log(err);
                        this.dialogRef.close(false);
                    });
            }
            else {
                this.businessService.updateBusiness(businessModel)
                    .subscribe(res => {
                        
                        this.result = res;
                        this.dialogRef.close(this.result);
                    },
                    err => {
                        console.log(err);
                        this.dialogRef.close(false);
                    });
            }
        }
    }
}
