import { Gstin } from './gstin';

export class Business {    
    constructor(
        public id: string,
        public businessName: string,
        public pan: string,
        public logo: string,        
        public gstins: Gstin[]
    ){}
}