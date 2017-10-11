import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Contact, State } from './../models';

@Injectable()
export class ContactService {

  constructor(
    private http: Http
  ) { }

  getAllContacts(businessId: string): Observable<Contact[]> {
    return this.http.get('v1/business/' + businessId + '/contact')
      .map(this.mapContacts);
  }

  getContact(businessId: string, contactId: string): Observable<Contact> {
    return this.http.get('v1/business/' + businessId + '/contact/' + contactId)
      .map(this.mapContact);
  }

  addContact(businessId: string, contact: Contact): Observable<Contact> {
    return this.http.post('v1/business/' + businessId + '/contact/add', contact)
      .map(this.mapContact);
  }

  updateContact(businessId: string, contact: Contact): Observable<Contact> {
    return this.http.post('v1/business/' + businessId + '/contact/update', contact)
      .map(this.mapContact);
  }

  private mapContacts(res: Response): Contact[] {
    return res.json().map(r => <Contact>({
      id: r._id,
      name: r.name,
      pan: r.pan,
      gstin: r.gstin,
      contactPerson: r.contactPerson,
      mobile: r.mobile,
      state: r.state,
      address: r.address,
      pinCode: r.pinCode,
      city: r.city,
      email: r.email,
      landline: r.landline,
      country: r.country
    }));
  }

  private mapContact(res: Response): Contact {
    let r = res.json();
    let contact = <Contact>({
      id: r._id,
      name: r.name,
      pan: r.pan,
      gstin: r.gstin,
      contactPerson: r.contactPerson,
      mobile: r.mobile,
      state: r.state,
      address: r.address,
      pinCode: r.pinCode,
      city: r.city,
      email: r.email,
      landline: r.landline,
      country: r.country
    });
    return contact;
  }
}
