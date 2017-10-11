import { Component, Inject, OnInit, OnChanges } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/map';


const PAN_REGEX = /[A-Z]{5}\d{4}[A-Z]{1}/;
const GST_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

// this is for add business model
@Component({
    selector: 'confirm',
    templateUrl: './confirm.dialog.html',
})

export class ConfirmDialog {

    constructor(public dialogRef: MdDialogRef<ConfirmDialog>,
        @Inject(MD_DIALOG_DATA) public data: any,
    ) {

        debugger;

    }

    onClose(result: string) {
        this.dialogRef.close(result);
    } 
}
