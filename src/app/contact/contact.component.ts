import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

import { Business, Contact } from './../models';
import { ContactService, CommonService, StateService } from './../services';
import { ContactAddDialog } from './dialog/contact-add.dialog';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  currentBusiness: Business;
  contacts: Contact[] = [];

  constructor(
    private dialog: MdDialog,
    private contactService: ContactService,
    private commonService: CommonService,
    private stateService: StateService
  ) {    
  }

  ngOnInit() {
    this.currentBusiness = this.commonService.getCurrentBusiness();
    this.loadContacts();
  }

  loadContacts() {
    this.contactService.getAllContacts(this.currentBusiness.id)
      .subscribe(contacts => {
        this.contacts = contacts;
      });
  }

  openContactDialog(contact: Contact) {
    let dialogRef = this.dialog.open(ContactAddDialog, {
      data: contact
    });

    dialogRef.afterClosed().subscribe(result => {      
      if (result == 'success') {
        this.loadContacts();
      } else {
        // Do nothing, just close the dialog
        console.log(result);
      }
    });
  }

  getStateName(stateCode: string) {
    let state = this.stateService.get(stateCode);
    return state ? state.stateName : '';
  }
}
