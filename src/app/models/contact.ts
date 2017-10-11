import { State } from './state';

export class Contact {
    constructor(
        public id: string,
        public name: string,
        public pan: string,
        public gstin: string,
        public contactPerson: string,
        public mobile: string,
        public state: string,
        public address: string,
        public pinCode: string,
        public city: string,
        public email: string,
        public landline: string,
        public country: string
    ){}
}