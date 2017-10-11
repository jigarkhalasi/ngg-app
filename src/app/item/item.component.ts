import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

import { Business, Item } from './../models';
import { CommonService, ItemService } from './../services';
import { ItemAddDialog } from './dialog/item-add.dialog';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  currentBusiness: Business;
  items: Item[] = [];

  constructor(
    private dialog: MdDialog,
    private itemService: ItemService,
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.currentBusiness = this.commonService.getCurrentBusiness();
    this.loadItems();
  }

  loadItems() {
    this.itemService.getAllItems(this.currentBusiness.id)
      .subscribe(items => {
        this.items = items;
      });
  }

  openItemDialog(item: Item) {
    let dialogRef = this.dialog.open(ItemAddDialog, {
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'success') {
        this.loadItems();
      } else {
        // Do nothing, just close the dialog
        console.log(result);
      }
    });
  }

}
