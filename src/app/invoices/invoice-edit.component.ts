import { Component, OnInit, OnChanges, DoCheck, OnDestroy, SimpleChanges } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { Business, Contact, Gstin, Invoice, InvoiceDetail, State } from './../models';
import { ContactService, CommonService, InvoiceService, StateService, } from './../services';
import { AddressDialog } from './dialog/address.dialog'
import { ContactAddDialog } from './../contact';
import { ItemAddDialog } from './../item';

@Component({
  selector: 'app-invoice-edit',
  templateUrl: './invoice-edit.component.html'
})
export class InvoiceEditComponent implements OnInit {
  currentBusiness: Business;
  currentGstin: Gstin;
  invoice: Invoice;
  invoiceId: string;
  invoiceType: string = 's';
  isNew: boolean;

  itemTypes: any;
  states: State[];
  contacts: Contact[];
  advancedSetting: any = 1;
  advancedSettings: any;
  gstSlabs: any;
  gstSlabsAsHalf: any;

  isCgstDisabled: boolean = true;
  isSgstDisabled: boolean = true;
  isIgstDisabled: boolean = false;

  totalModel = {
    discount: 0,
    taxableValue: 0,
    cgst: 0,
    sgst: 0,
    igst: 0,
    cess: 0,
    grandTotal: 0
  }

  formGroup: FormGroup;
  filteredContacts: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private dialog: MdDialog,
    private contactService: ContactService,
    private commonService: CommonService,
    private invoiceService: InvoiceService,
    private stateService: StateService
  ) {
    this.createFormGroup();

    this.invoice = this.invoiceService.getBlankInvoiceRecord();
  }

  createFormGroup() {
    this.formGroup = this.formBuilder.group({
      invoiceSequenceNo: 'Auto Generated',
      invoiceDate: [new Date(), Validators.required],
      reference: '',
      dueDate: '',
      contact: [null, Validators.required],
      contactGstin: ['', Validators.required],
      placeOfSupply: '',
      sameAsBillingAddress: false
    });
  }

  ngOnInit() {      
    this.currentBusiness = this.commonService.getCurrentBusiness();
    this.currentGstin = this.commonService.getCurrentGstin();
    this.invoiceId = this.route.snapshot.paramMap.get('invoiceId');
    this.invoiceType = this.route.snapshot.paramMap.get('invoiceType');

    this.loadStates();
    this.loadMasterData();
    this.loadContacts();

    

    if (this.invoiceId) {
      this.isNew = false;

      this.invoiceService.getInvoice(this.currentGstin.id, this.invoiceId)
        .subscribe(data => {

          this.invoice = data;

          // add one blank invoice detail row if it is in edit mode
          let invoiceDetail = this.invoiceService.getBlankInvoiceDetailRecord();
          invoiceDetail.itemOrdinal = this.invoice.invoiceDetails.length;
          this.invoice.invoiceDetails.push(invoiceDetail);

          this.formGroup.setValue({
            invoiceSequenceNo: this.invoice.invoiceSequenceNo,
            invoiceDate: this.invoice.invoiceDate,
            reference: this.invoice.reference,
            dueDate: this.invoice.dueDate,
            contact: {},
            contactGstin: this.invoice.contactGstin,
            placeOfSupply: this.invoice.placeOfSupply,
            sameAsBillingAddress: this.isBillingAddressSameAsShipping()
          });

          this.contactService.getContact(this.currentBusiness.id, this.invoice.contactId).subscribe(
            result => {              
              this.formGroup.patchValue({
                contact: result
              });
            }
          );

          this.showHideTaxInputs(this.invoice.placeOfSupply);
        });

    } else {
      this.isNew = true;      
      this.formGroup.patchValue({
        sameAsBillingAddress: true
      });
    }

    this.formGroup.controls.placeOfSupply.valueChanges.subscribe(value => {      
      this.showHideTaxInputs(value);
    });
  }

  loadStates() {
    // Get all states
    this.states = this.stateService.getAll();
  }

  loadMasterData() {
    this.itemTypes = this.commonService.getItemTypes();
    this.advancedSettings = this.commonService.getAdvancedSettingsForInvoice();
    this.gstSlabs = this.commonService.getGstSlabs();
    this.gstSlabsAsHalf = this.commonService.getGstSlabsAsHalf();
  }

  loadContacts() {
    this.contactService.getAllContacts(this.currentBusiness.id)
      .subscribe(
      (data) => {
        this.contacts = data;

        // on edit mode set saved contact as selected
        /* if (!this.isNew) {          
          let selectedContact = this.contacts.find(c => c.id == this.invoice.contactId);
          this.formGroup.patchValue({
            contact: selectedContact
          });
        } */

        this.filteredContacts = this.formGroup.controls.contact.valueChanges
          .startWith(null)
          //.map(name => this.filterContacts(name));
          .map(contact => contact && typeof contact === 'object' ? contact.name : contact)
          .map(name => name ? this.filterContacts(name) : this.contacts.slice());
      });
  }

  filterContacts(val: string) {
    return val ? this.contacts.filter(c => c.name.toLowerCase().indexOf(val.toLowerCase()) === 0) : [];
  }

  displayContactName(contact: Contact): string {
    return contact ? contact.name : '';
  }

  onSelectContact(contact: Contact) {

    if (contact) {
      this.formGroup.patchValue({
        contactGstin: contact.gstin
      });
      this.formGroup.patchValue({
        placeOfSupply: contact.state
      });

      this.invoice.billingAddress.address = contact.address;
      this.invoice.billingAddress.city = contact.city;
      this.invoice.billingAddress.pinCode = contact.pinCode;
      this.invoice.billingAddress.state = contact.state ? this.stateService.get(contact.state).stateName : '';

      if (this.formGroup.value.sameAsBillingAddress) {
        this.invoice.shippingAddress.address = contact.address;
        this.invoice.shippingAddress.city = contact.city;
        this.invoice.shippingAddress.pinCode = contact.pinCode;
        this.invoice.shippingAddress.state = contact.state ? this.stateService.get(contact.state).stateName : '';
      }
    }
  }

  /*
  * Open billing and shipping address modal
  *
  */
  openAddressDialog(addressType) {

    let dialogRef = this.dialog.open(AddressDialog, {
      data: addressType == 'billing' ? this.invoice.billingAddress : this.invoice.shippingAddress,
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result == true) {
        // Do nothing, just close the dialog
      }
      else {
        if (addressType == 'billing') {
          this.invoice.billingAddress = result;
          if (this.formGroup.value.sameAsBillingAddress) {
            this.invoice.shippingAddress = result;
          }
        } else {
          this.invoice.shippingAddress = result;
        }
      }
    });
  }

  openContactDialog() {

    let dialogRef = this.dialog.open(ContactAddDialog, {

    });

    dialogRef.afterClosed().subscribe(result => {

      if (result == true) {
        // Do nothing, just close the dialog
      } else {
        console.log(result);
      }
    });
  }

  openItemDialog() {

    let dialogRef = this.dialog.open(ItemAddDialog, {

    });

    dialogRef.afterClosed().subscribe(result => {

      if (result == true) {
        // Do nothing, just close the dialog
      } else {
        console.log(result);
      }
    });
  }

  onChangeRecord(model) {
    // Calculate the taxable value and total

    //model.taxableValue = 0;

    let qty = model.qty | 0;
    let ratePerItem = model.ratePerItem | 0;
    let discount = model.discount | 0;

    if (qty > 0 && ratePerItem > 0) {
      model.taxableValue = qty * ratePerItem;
    }

    if (discount > 0) {
      model.taxableValue -= model.discount;
    }

    // Need to add all the tax from taxable value to generate total
    let tax = 0;
    if (model.cgstPer >= 0) {
      model.cgstAmount = (model.taxableValue * model.cgstPer) / 100;
      tax += model.cgstAmount;
    }
    if (model.sgstPer >= 0) {
      model.sgstAmount = (model.taxableValue * model.sgstPer) / 100;
      tax += model.sgstAmount;
    }
    if (model.igstPer >= 0) {
      model.igstAmount = (model.taxableValue * model.igstPer) / 100;
      tax += model.igstAmount;
    }

    model.total = model.taxableValue + tax;

    this.calculateGrandTotal();
  }

  onChangeTaxableValue(model) {
    if (model.taxableValue > 0) {
      // Need to minus all the tax from taxable value to generate flat total
      model.total = model.taxableValue;
    }
    else {
      model.total = 0;
    }

    this.calculateGrandTotal();
  }

  onBlurInput(model) {    
    if ((model.itemOrdinal + 1) == this.invoice.invoiceDetails.length) {
      let invoiceDetail = this.invoiceService.getBlankInvoiceDetailRecord();
      invoiceDetail.itemOrdinal = this.invoice.invoiceDetails.length;
      this.invoice.invoiceDetails.push(invoiceDetail);
    }
  }

  calculateGrandTotal() {    
    this.totalModel.discount = 0;
    this.totalModel.taxableValue = 0;
    this.totalModel.cgst = 0;
    this.totalModel.sgst = 0;
    this.totalModel.igst = 0;
    this.totalModel.cess = 0;
    this.totalModel.grandTotal = 0;

    for (let i in this.invoice.invoiceDetails) {
      let model = this.invoice.invoiceDetails[i];

      this.totalModel.discount += (model.discount > 0 ? +model.discount : 0);
      this.totalModel.taxableValue += (model.taxableValue > 0 ? +model.taxableValue : 0);
      this.totalModel.cgst += (model.cgstAmount > 0 ? +model.cgstAmount : 0);
      this.totalModel.sgst += (model.sgstAmount > 0 ? +model.sgstAmount : 0);
      this.totalModel.igst += (model.igstAmount > 0 ? +model.igstAmount : 0);
      this.totalModel.cess += (model.cessAmount > 0 ? +model.cessAmount : 0);
      this.totalModel.grandTotal += (model.total > 0 ? +model.total : 0);
    }
  }

  onChangeSameAsBillingAddress() {

    if (this.formGroup.value.sameAsBillingAddress) {
      this.invoice.shippingAddress.address = this.invoice.billingAddress.address;
      this.invoice.shippingAddress.city = this.invoice.billingAddress.city;
      this.invoice.shippingAddress.pinCode = this.invoice.billingAddress.pinCode;
      this.invoice.shippingAddress.state = this.invoice.billingAddress.state;
    }
  }

  isBillingAddressSameAsShipping() {
    if (this.invoice.billingAddress.address === this.invoice.shippingAddress.address
      && this.invoice.billingAddress.city === this.invoice.shippingAddress.city
      && this.invoice.billingAddress.pinCode === this.invoice.shippingAddress.pinCode
      && this.invoice.billingAddress.state === this.invoice.shippingAddress.state) {
      return true;
    }
    return false;
  }

  showHideTaxInputs(placeOfSupply) {    
    if (this.states) {
      let state = this.states.find(s => s.stateCode == placeOfSupply);
      if (state) {
        if (state.stateCode == '24') {
          this.isCgstDisabled = false;
          this.isSgstDisabled = false;
          this.isIgstDisabled = true;
        } else {
          this.isCgstDisabled = true;
          this.isSgstDisabled = true;
          this.isIgstDisabled = false;
        }

        for (let i in this.invoice.invoiceDetails) {

          this.invoice.invoiceDetails[i].cgstPer = 0;
          this.invoice.invoiceDetails[i].cgstAmount = 0;
          this.invoice.invoiceDetails[i].sgstPer = 0;
          this.invoice.invoiceDetails[i].sgstAmount = 0;
          this.invoice.invoiceDetails[i].igstPer = 0;
          this.invoice.invoiceDetails[i].igstAmount = 0;

          this.onChangeRecord(this.invoice.invoiceDetails[i]);
        }
      }
    }
  }

  onChangeTax(model) {
    this.onChangeRecord(model);
  }

  onSubmit() {    

    if (this.formGroup.invalid) {
      alert('Please enter proper info');
      return;
    }

    const viewModel = this.formGroup.value;

    this.invoice.gstinId = this.currentGstin.id;    
    this.invoice.invoiceDate = viewModel.invoiceDate;
    this.invoice.invoiceType = this.invoiceType;
    this.invoice.reference = viewModel.reference;
    this.invoice.dueDate = viewModel.dueDate;
    this.invoice.contactId = viewModel.contact ? viewModel.contact.id : '';
    this.invoice.contactName = viewModel.contact ? viewModel.contact.name : '';
    this.invoice.contactGstin = viewModel.contactGstin;
    this.invoice.placeOfSupply = viewModel.placeOfSupply;
    // invoiceId, billingAddress, shippingAddress are already there in this.invoice object

    let invoiceDetails = this.invoice.invoiceDetails.filter(i => i.itemDescription !== '');

    if (invoiceDetails && invoiceDetails.length <= 0) {
      alert('Please enter atleast one row for invoice');
      return;
    }

    this.invoice.invoiceDetails = invoiceDetails;

    let index = 0;
    this.invoice.invoiceDetails.forEach(i => {
      i.itemOrdinal = index++;
    });
    
    if (this.invoice.id) {
      this.invoiceService.updateInvoice(this.currentGstin.id, this.invoice)
        .subscribe(res => {
          this.navigateToList();
        },
        err => {
          console.log(err);
        });
    } else {
      this.invoiceService.addInvoice(this.currentGstin.id, this.invoice)
        .subscribe(res => {          
          this.navigateToList();
        },
        err => {          
          console.log(err);
        });
    }
  }

  navigateToList() {
    if (this.invoiceType == "p") {
      this.router.navigate(['/purchases']);
    } else {
      this.router.navigate(['/sales']);
    }
  }
}
