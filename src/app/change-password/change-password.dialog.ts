import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'change-password-dialog',
    templateUrl: './change-password.dialog.html',
})

export class ChangePasswordDialog {
    //business form model
    formGroup: FormGroup;
    
    constructor(
        public dialogRef: MdDialogRef<ChangePasswordDialog>,
        private formBuilder: FormBuilder
    ) {        
        this.formGroup = this.formBuilder.group({
            oldPassword: ['', Validators.required],
            newPassword: ['', Validators.required],
            confirmPassword: ['', Validators.required]            
        });
    }   

    onClose(result: string) {
        
        // space for validation and other before closing task
        this.dialogRef.close(true);
    }

    onSubmit() {
        
        if (this.formGroup.valid) {
        const viewModel = this.formGroup.value;
        /* this.businessService.addBusiness(businessModel)
            .subscribe(res => { 
                
                this.result = res;
                this.dialogRef.close(this.result);         
            },
            err => {
                console.log(err);
                this.dialogRef.close(false);                
            }); */
        } else {
            // raise alert message about error
        }
                
    }
}