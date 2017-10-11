import { Component, Inject, OnInit } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Business, Item } from './../../models';
import { CommonService, ItemService } from './../../services';

@Component({
    selector: 'item-add-dialog',
    templateUrl: './item-add.dialog.html'
})
export class ItemAddDialog implements OnInit {
    currentBusiness: Business;
    formGroup: FormGroup;
    itemTypes: any;
    units: any;
    itemId: string;
    item: Item;
    loading: boolean = false;

    constructor(
        private dialogRef: MdDialogRef<ItemAddDialog>,
        @Inject(MD_DIALOG_DATA) public data: Item,
        private formBuilder: FormBuilder,
        private commonService: CommonService,
        private itemService: ItemService
    ) {        
        this.item = data;
        this.currentBusiness = this.commonService.getCurrentBusiness();

        this.formGroup = this.formBuilder.group({
            itemDescription: ['', Validators.required],
            itemType: ['G', Validators.required],
            hsnCode: [''],
            itemCode: [''],
            sellingPrice: [''],
            purchasePrice: [''],
            unitOfMeasurement: [''],
            discount: [null],
            itemNotes: ['']
        });
    }

    ngOnInit() {
        this.itemTypes = this.commonService.getItemTypes();
        this.units = this.commonService.getUnitOfMeasurements();

        if (this.item) {
            this.formGroup.setValue({
                itemDescription: this.item.itemDescription,
                itemType: this.item.itemType,
                hsnCode: this.item.hsnCode,
                itemCode: this.item.itemCode,
                sellingPrice: this.item.sellingPrice,
                purchasePrice: this.item.purchasePrice,
                unitOfMeasurement: this.item.unitOfMeasurement,
                discount: this.item.discount,
                itemNotes: this.item.itemNotes
            });
        }
    }

    onClose(result: string) {
        this.dialogRef.close('close');
    }

    onSubmit() {        
        if (this.formGroup.valid) {
            this.loading = true;

            let viewModel = this.formGroup.value;

            this.item = {
                id: this.item ? this.item.id : '',
                itemDescription: viewModel.itemDescription,
                itemType: viewModel.itemType,
                hsnCode: viewModel.hsnCode,
                itemCode: viewModel.itemCode,
                sellingPrice: viewModel.sellingPrice,
                purchasePrice: viewModel.purchasePrice,
                unitOfMeasurement: viewModel.unitOfMeasurement,
                discount: viewModel.discount,
                itemNotes: viewModel.itemNotes
            }

            if (this.item.id) {
                this.itemService.updateItem(this.currentBusiness.id, this.item)
                    .subscribe(res => {
                        this.dialogRef.close('success');
                    },
                    err => {
                        console.log(err);
                        this.dialogRef.close('error');
                    });
            } else {
                this.itemService.addItem(this.currentBusiness.id, this.item)
                .subscribe(res => {
                    this.dialogRef.close('success');
                },
                err => {
                    console.log(err);
                    this.dialogRef.close('error');
                });
            }

            //this.dialogRef.close(viewModel);
        } else {
            // raise alert message about error
        }

    }
}